import Button from "./Button";
import { useRef, useState } from "react";
import Ocr from "../utils/ocr";

export default function Modal({ onSubmit, onClick, field, setLoading, buttonName }) {
  const handleClose = () => {
    if (
      window.confirm(
        "Are you sure you want to cancel? All changes will be deleted."
      )
    ) {
      onClick();
    }
  }
  const capture = useRef(null);
  const upload = useRef(null);
  const ocrScanner = Ocr({
    number: localStorage.getItem("mobile_number") ?? "+63 912 345 6789",
  });
  const [fields, setFields] = useState({
    mode: "",
    sender: "",
    amount: "",
    reference: "",
    date: "",
  });
  const handleImage = async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const ocrResult = await ocrScanner.extract(file);
      setFields((prev) => ({
        ...prev,
        mode: ocrResult.type.toLowerCase(),
        sender: ocrResult.number,
        amount: ocrResult.amount.replace(/,/g, ""),
        reference: ocrResult.reference.trim(),
        date: ocrResult.date,
      }))
    } catch (err) {
      console.error("OCR error:", err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleDate = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };
  return (
    <>
      <form
        onSubmit={onSubmit}
        onClick={handleClose}
        className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[6px] rounded flex justify-center z-50 text-black"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-b from-[rgba(255,255,255,0.5)] via-[rgba(255,255,255,0.6)] to-[rgba(255,255,255,0.7)] backdrop-blur-[6px] p-5 rounded shadow-lg my-auto max-h-screen flex flex-col gap-4 overflow-y-auto"
        >
          <div className="space-y-3">
            {field?.map((field, index) =>
              field.type === "select" ? (
                <div className="bg-[rgba(0,0,0,0.1)] p-5 rounded-lg" key={index}>
                  <label
                    htmlFor={field.name}
                    className="uppercase font-bold text-sm select-none"
                  >
                    {field.label}
                  </label>
                  <select
                    name={field.name}
                    className="outline-none w-full capitalize"
                    defaultValue={field.placeholder}
                    {...(fields.mode && { value: fields.mode })}
                    onChange={(e) => {
                      setFields((prev) => ({
                        ...prev,
                        mode: e.target.value,
                      }))
                    }}
                  >
                    {field.options.map((option, index) => {
                      return (
                        <option
                          key={index}
                          className="bg-[rgba(0,0,0,0.1)]"
                          value={option.value}
                          disabled={option.disabled}
                        >
                          {option.value}
                        </option>
                      );
                    })}
                  </select>
                </div>
              ) : field.type === "file" ? (
                <div className="bg-[rgba(0,0,0,0.1)] p-5 rounded-lg flex flex-col gap-3" key={index}>
                  <div onClick={() => upload.current?.click()} className="flex flex-col items-center gap-1 bg-gradient-to-b from-[rgba(0,0,0,0.1)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.3)] p-5 rounded-lg transition-all duration-300 cursor-pointer hover:rounded-[50px]">
                    <label htmlFor={field.name} className="uppercase font-bold text-sm select-none cursor-pointer">
                      Upload Image
                    </label>
                    <input
                      type={field.type}
                      accept={field.accept}
                      name={field.name}
                      className="hidden"
                      ref={upload}
                      onChange={handleImage}
                    />
                  </div>
                  <div onClick={() => capture.current?.click()} className="md:hidden flex flex-col items-center gap-1 bg-gradient-to-b from-[rgba(0,0,0,0.1)] via-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.3)] p-5 rounded-lg transition-all duration-300 cursor-pointer hover:rounded-[50px]">
                    <label htmlFor={field.name} className="uppercase font-bold text-sm select-none cursor-pointer">
                      Capture Image
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      capture="environment"
                      className="hidden"
                      ref={capture}
                      onChange={handleImage}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-[rgba(0,0,0,0.1)] p-5 rounded-lg relative" key={index}>
                  <label
                    htmlFor={field.name}
                    className="uppercase font-bold text-sm select-none"
                  >
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    {...(field.pattern && { pattern: field.pattern })}
                    {...(field.step && { step: field.step })}
                    {...(field.min && { min: field.min })}
                    {...(field.inputMode && { inputMode: field.inputMode })}
                    placeholder={field.name === "date" ? `ex. ${handleDate()}` : field.placeholder}
                    className="outline-none w-full bg-transparent"
                    required={field.required}
                    {...field.name === "sender" ? (
                      {...(fields.sender && { 
                        value: fields.sender,
                        onChange: (e) => setFields((prev) => ({
                          ...prev,
                          sender: e.target.value,
                        })),
                      })}
                    ) : field.name === "amount" ? (
                      {...(fields.amount && { 
                        value: fields.amount,
                        onChange: (e) => setFields((prev) => ({
                          ...prev,
                          amount: e.target.value,
                        }))
                      })}
                    ) : field.name === "reference" ? (
                      {...(fields.reference && { 
                        value: fields.reference,
                        onChange: (e) => setFields((prev) => ({
                          ...prev,
                          reference: e.target.value,
                        }))
                      })}
                    ) : field.name === "date" ? (
                      {...(fields.date && { 
                        value: fields.date,
                        onChange: (e) => setFields((prev) => ({
                          ...prev,
                          date: e.target.value,
                        }))
                      })}
                    ) : null}
                  />
                  {field.name === "date" && (
                    <button
                      type="button"
                      className={`text-sm font-bold text-blue-600 hover:text-blue-800 ${
                        fields.date !== handleDate() ? "" : "invisible"
                      }`}
                      onClick={() => setFields((prev) => ({
                        ...prev,
                        date: handleDate(),
                      }))}
                    >
                      Use Date Today
                    </button>
                  )}
                </div>
              )
            )}
          </div>

          <div className="flex justify-between gap-5">
            <Button
              className={`bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 text-black 
                hover:rounded-[50px]`}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type={"submit"}
              className={`bg-gradient-to-b from-red-300 via-red-400 to-red-500 text-white
                hover:rounded-[50px]`}
            >
              {buttonName}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
