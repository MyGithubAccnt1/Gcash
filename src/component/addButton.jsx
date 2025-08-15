import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import Loader from "./loader";
import Ocr from "../utils/ocr";
import { GS_POST_GCASH_URL } from "../utils/constant";
import axios from "axios";

export default function AddButton({ data, setData, setFetch }) {
  const [filterModal, setFilterModal] = useState(false);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState(null);
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [reference, setReference] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const ocrScanner = Ocr({ number: "+63 915 349 8132" });
  function handleCloseModal() {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be deleted."
      )
    ) {
      setFilterModal(false);
      setImage(null);
      setMode(null);
      setNumber(null);
      setAmount(null);
      setReference(null);
      setDate(null);
      inputRef1.current.value = null;
      inputRef2.current.value = null;
      setLoading(false);
    }
  }

  const handleImage = async (e) => {
    const file = e.target?.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setLoading(true);

    try {
      const ocrResult = await ocrScanner.extract(file);
      setMode(ocrResult.type);
      setNumber(ocrResult.number);
      setAmount(ocrResult.amount.replace(/,/g, ""));
      setReference(ocrResult.reference);
      setDate(ocrResult.date);
    } catch (error) {
      console.error("OCR error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = number && amount && reference && date;

    if (!isValid) {
      return;
    }

    setLoading(true);

    const newEntry = {
      system: "gcash",
      mode: mode,
      to: number,
      amount: amount,
      refNo: reference,
      date: date,
    };

    const updated = [...data, newEntry];

    try {
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(newEntry));
      const response = await axios.post(GS_POST_GCASH_URL, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
      console.log("Server response:", response.data);
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }

    localStorage.setItem("data", JSON.stringify(updated));
    setData(updated);
    setFetch((prev) => !prev);
    setFilterModal(false);
    setImage(null);
    setMode(null);
    setNumber(null);
    setAmount(null);
    setReference(null);
    setDate(null);
    inputRef1.current.value = null;
    inputRef2.current.value = null;
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <div
        onClick={() => setFilterModal(true)}
        className="flex items-center gap-1 bg-red-600 px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
      >
        <b>Add Record</b>
        <FontAwesomeIcon icon={faPlus} />
      </div>

      {filterModal && (
        <form
          onSubmit={handleSubmit}
          onClick={() => setFilterModal(false)}
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 text-black"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white !p-5 rounded shadow-lg flex flex-col gap-4 min-w-[320px] max-h-[100dvh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2 justify-between">
              <div
                onClick={() => inputRef1.current?.click()}
                className="md:!mx-auto w-full flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faPlus} />
                <i className="text-sm select-none">Upload Image</i>
                <input
                  id="cameraInput"
                  ref={inputRef1}
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </div>
              <div
                onClick={() => inputRef2.current?.click()}
                className="md:hidden flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg transition-all duration-300 cursor-pointer"
              >
                <FontAwesomeIcon icon={faCamera} />
                <i className="text-sm select-none">Capture Image</i>
                <input
                  id="cameraInput"
                  ref={inputRef2}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage}
                  className="hidden"
                />
              </div>
            </div>

            {image && (
              <div className="flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg transition-all duration-300 cursor-pointer">
                <img
                  src={image}
                  alt="Captured"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            <div className="bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg relative">
              <label
                className={`absolute transition-all duration-300 select-none ${
                  mode !== "" && mode !== null
                    ? "text-sm italic top-1 text-gray-500"
                    : "text-md"
                }`}
              >
                Mode
              </label>
              <select
                className="outline-none w-full"
                value={mode || ""}
                onChange={(e) => setMode(e.target.value)}
              >
                <option className="bg-[rgba(0,0,0,0.1)]" value=""></option>
                <option className="bg-[rgba(0,0,0,0.1)]" value="Sent">
                  Sent
                </option>
                <option className="bg-[rgba(0,0,0,0.1)]" value="Received">
                  Received
                </option>
              </select>
            </div>

            {mode && (
              <div className="bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg relative">
                <label
                  htmlFor="sender"
                  className={`absolute text-gray-500 transition-all duration-300 ${
                    number ? "text-sm italic top-1" : "text-md"
                  }`}
                >
                  Sender(+63 9XX XXX XXXX)
                </label>
                <input
                  id="sender"
                  type="tel"
                  pattern="\+63\s?\d{3}\s?\d{3}\s?\d{4}"
                  value={number || ""}
                  onChange={(e) => setNumber(e.target.value)}
                  className="outline-none w-full bg-transparent"
                />
              </div>
            )}

            {number && (
              <div className="bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg relative">
                <label
                  htmlFor="amount"
                  className={`absolute text-gray-500 transition-all duration-300 ${
                    amount ? "text-sm italic top-1" : "text-md"
                  }`}
                >
                  Amount
                </label>
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount || ""}
                  onChange={(e) => setAmount(e.target.value)}
                  className="outline-none w-full bg-transparent"
                />
              </div>
            )}

            {amount && (
              <div className="bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg relative">
                <label
                  htmlFor="reference"
                  className={`absolute text-gray-500 transition-all duration-300 ${
                    reference ? "text-sm italic top-1" : "text-md"
                  }`}
                >
                  Reference No.(XXXX XXX XXXXXX)
                </label>
                <input
                  id="reference"
                  type="text"
                  pattern="\d{4}\s?\d{3}\s?\d{6}"
                  inputMode="numeric"
                  value={reference || ""}
                  onChange={(e) => setReference(e.target.value)}
                  className="outline-none w-full bg-transparent"
                />
              </div>
            )}

            {reference && (
              <div className="bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg relative">
                <label
                  htmlFor="date"
                  className={`absolute text-gray-500 transition-all duration-300 ${
                    date ? "text-sm italic top-1" : "text-md"
                  }`}
                >
                  Date
                </label>
                <input
                  id="date"
                  type="text"
                  value={date || ""}
                  onChange={(e) => setDate(e.target.value)}
                  className="outline-none w-full bg-transparent"
                />
              </div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                className="hover:bg-[rgba(0,0,0,0.1)] !px-5 !py-3 rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleCloseModal()}
              >
                <b>Cancel</b>
              </button>
              <button
                type="submit"
                className="text-white bg-red-600 !px-5 !py-3 rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
              >
                <b>Add</b>
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
