import { useEffect, useState } from "react";
import Loader from "../../component/loader";
import Search from "./component/Search";
import Button from "./component/Button";
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
  const [field, setField] = useState({
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
        required: true,
      },
    ],
    add: [
      { type: "file", label: "Upload Image", name: "image" },
      {
        type: "select",
        label: "Payment Mode",
        name: "payment_mode",
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
        required: true,
      },
      {
        type: "tel",
        label: "Sender",
        name: "sender",
        pattern: "+63s?9d{2}s?d{3}s?d{4}",
        placeholder: "ex. +63 9XX XXX XXXX",
      },
      {
        type: "number",
        label: "Amount",
        name: "amount",
        step: "0.01",
        min: "0.01",
        placeholder: "ex. 1000.00",
      },
    ],
  });
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
          console.error("Failed to fetch:", error);
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
      ? (setFilter(data.filter),
        setModal((prev) => ({
          ...prev,
          filter: false,
        })))
      : toast.error("Payment Mode is required!");
  };
  return (
    <>
      <div
        className="flex flex-col items-center px-5 gap-3
      lg:flex-row lg:justify-between lg:items-start"
      >
        <Search
          setSearch={setSearch}
          setFilter={(e) =>
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
            onClick={(e) =>
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
          onClick={(e) =>
            setModal((prev) => ({
              ...prev,
              filter: false,
            }))
          }
          field={field.filter}
        />
      )}
      {modal.add && (
        <Modal
          onClick={(e) =>
            setModal((prev) => ({
              ...prev,
              add: false,
            }))
          }
          field={field.add}
        />
      )}
      <ToastContainer position="top-center" autoClose={3000} />
      {loading && <Loader />}
    </>
  );
}
