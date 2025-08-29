import { useEffect, useState } from "react";
import Loader from "../../component/loader";
import Search from "../../component/Search";
import Button from "../../component/Button";
import { BiAddToQueue } from "react-icons/bi";
import { FaFileDownload } from "react-icons/fa";
import Modal from "../../component/Modal";
import FetchData from "../../component/fetchData";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GS_GET_d60d97c6_f896_4f6b_826c_0a9b945dde79,
  GS_GET_GCASH_URL,
  GS_POST_d60d97c6_f896_4f6b_826c_0a9b945dde79,
  GS_POST_GCASH_URL,
} from "../../utils/constant";

export default function Index() {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [refetch, setFetch] = useState(false);
  const [modal, setModal] = useState({
    filter: false,
    add: false,
  });
  const field = {
    filter: [
      {
        type: "select",
        label: "Payment Mode",
        name: "filter",
        placeholder: "select payment mode",
        options: [
          { value: "select payment mode", disabled: true },
          { value: "all" },
          { value: "sent" },
          { value: "received" },
          { value: "eletric bill" },
          { value: "internet bill" },
          { value: "water bill" },
          { value: "others" },
        ],
      },
    ],
    add: [
      { type: "file", name: "image", accept: "image/*" },
      {
        type: "select",
        label: "Payment Mode",
        name: "mode",
        placeholder: "select payment mode",
        options: [
          { value: "select payment mode", disabled: true },
          { value: "sent" },
          { value: "received" },
          { value: "eletric bill" },
          { value: "internet bill" },
          { value: "water bill" },
          { value: "others" },
        ],
      },
      {
        type: "tel",
        label: "Sender",
        name: "sender",
        pattern: `^\\+63\\s?9\\d{2}\\s?\\d{3}\\s?\\d{4}$`,
        placeholder: "ex. +63 9XX XXX XXXX",
        required: true,
      },
      {
        type: "number",
        label: "Amount",
        name: "amount",
        step: "0.01",
        min: "0.01",
        placeholder: "ex. 1000.00",
        required: true,
      },
      {
        type: "text",
        label: "Reference No.",
        name: "reference",
        pattern: "^\\d{4}\\s?\\d{3}\\s?\\d{6}$",
        inputMode: "numeric",
        placeholder: "ex. 1234 567 891011",
        required: true,
      },
      {
        type: "text",
        label: "Date",
        name: "date",
        required: true,
      },
    ],
  };
  useEffect(() => {
    const fetchData = () => {
      const local = localStorage.getItem("gcash_data");
      const data = JSON.parse(local);
      const isValidData = Array.isArray(data);
      setData(isValidData ? data : []);

      const gcash_gs = async () => {
        if (!isValidData) setLoading(true);

        try {
          const response =
            localStorage.getItem("registration") ===
            "d60d97c6-f896-4f6b-826c-0a9b945dde79"
              ? await axios.get(GS_GET_d60d97c6_f896_4f6b_826c_0a9b945dde79)
              : await axios.get(GS_GET_GCASH_URL);
          const result = await response.data;
          const isValidResult = Array.isArray(result) ? result : [];

          const isDifferent =
            JSON.stringify(data) !== JSON.stringify(isValidResult);

          if (isDifferent) {
            setData(isValidResult);
            localStorage.setItem("gcash_data", JSON.stringify(isValidResult));
          }
        } catch (error) {
          console.error("Failed to fetch:", error.response.data.message);
        } finally {
          if (!isValidData) setLoading(false);
        }
      };

      gcash_gs();
    };

    fetchData();
  }, [refetch]);
  const handleFilter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.filter
      ? (data.filter === "all" ? setFilter("") : setFilter(data.filter),
        setModal((prev) => ({
          ...prev,
          filter: false,
        })))
      : (setFilter(""),
        setModal((prev) => ({
          ...prev,
          filter: false,
        })));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = Object.fromEntries(formData.entries());
    const normalize = (reference) => String(reference).replace(/\s/g, "");
    const isExisting = data.some(
      (data) => normalize(data.refNo ?? "") === normalize(fields.reference)
    );
    if (isExisting) {
      toast.error("This reference already exist and wouldn`t be saved.");
      return;
    }
    setLoading(true);
    const newEntry = {
      system: "gcash",
      mode: fields.mode,
      to: fields.sender,
      amount: fields.amount,
      refNo: fields.reference,
      date: fields.date,
    };

    const updated = [...data, newEntry];

    try {
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(newEntry));
      await axios.post(
        localStorage.getItem("registration") ===
          "d60d97c6-f896-4f6b-826c-0a9b945dde79"
          ? GS_POST_d60d97c6_f896_4f6b_826c_0a9b945dde79
          : GS_POST_GCASH_URL,
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setModal((prev) => ({
        ...prev,
        add: false,
      }))
      localStorage.setItem("gcash_data", JSON.stringify(updated));
      setData(updated);
      setFetch((prev) => !prev)
    } catch (err) {
      toast.error(err.response.data.message)
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div
        className="flex flex-col items-center px-5 gap-3
      lg:flex-row lg:justify-between lg:items-start"
      >
        <Search
          setSearch={setSearch}
          setFilter={() =>
            setModal((prev) => ({
              ...prev,
              filter: true,
            }))
          }
        />
        <div
          className="flex flex-col items-end gap-3 ms-auto
        md:flex-row md:justify-end md:items-center"
        >
          <Button
            onClick={() =>
              setModal((prev) => ({
                ...prev,
                add: true,
              }))
            }
            className={`bg-gradient-to-b from-red-300 via-red-400 to-red-500 text-white 
                hover:rounded-[50px]`}
          >
            <h6 className="flex items-center gap-2">
              Add Record
              <BiAddToQueue />
            </h6>
          </Button>
          <Button
            className={`bg-gradient-to-b from-green-300 via-green-400 to-green-500 text-white 
                hover:rounded-[50px]`}
          >
            <h6 className="flex items-center gap-2">
              Add Record
              <FaFileDownload />
            </h6>
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <FetchData
          data={data}
          setData={setData}
          search={search}
          filter={filter}
        />
      </div>
      
      {modal.filter && (
        <Modal
          onSubmit={handleFilter}
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              filter: false,
            }))
          }
          field={field.filter}
          buttonName={'Apply Filters'}
        />
      )}
      {modal.add && (
        <Modal
          onSubmit={handleSubmit}
          onClick={() =>
            setModal((prev) => ({
              ...prev,
              add: false,
            }))
          }
          field={field.add}
          setLoading={setLoading}
          buttonName={'Save Record'}
        />
      )}
      <ToastContainer position="top-center" autoClose={3000} />
      {loading && <Loader />}
    </>
  );
}
