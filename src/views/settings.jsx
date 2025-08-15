import Loader from "../component/loader";
import { useState, useEffect, useRef } from "react";
import { GS_REGISTRATION_URL } from "../utils/constant";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faPlus, faCamera } from "@fortawesome/free-solid-svg-icons";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [registration, setRegistration] = useState("");
  const [activationDate, setActivationDate] = useState("");
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState(null);
  const [number, setNumber] = useState(null);
  const [amount, setAmount] = useState(null);
  const [reference, setReference] = useState(null);
  const [date, setDate] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setMobileNumber(localStorage.getItem("mobile_number") || "");
    setRegistration(localStorage.getItem("registration") || "");
    setActivationDate(localStorage.getItem("activation_date") || "");
  }, []);

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newEntry = {
        code: e.target[0].value,
      };
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(newEntry));
      const response = await axios.post(GS_REGISTRATION_URL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const data = response.data[0].data;
      localStorage.removeItem("name");
      localStorage.removeItem("mobile_number");
      localStorage.removeItem("registration");
      localStorage.removeItem("activation_date");

      localStorage.setItem("name", data[0]);
      localStorage.setItem("mobile_number", data[1]);
      localStorage.setItem("registration", data[2]);
      localStorage.setItem("status", data[3]);
      localStorage.setItem("activation_date", data[4]);

      setName(data[0]);
      setMobileNumber(data[1]);
      setRegistration(data[2]);
      setActivationDate(data[4]);
    } catch (error) {
      handleReset();
      alert.error("Error sending data:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("mobile_number");
    localStorage.removeItem("registration");
    localStorage.removeItem("activation_date");
    setName("");
    setMobileNumber("");
    setRegistration("");
    setActivationDate("");
  };

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

  const getFormattedNow = () => {
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
      {loading && <Loader />}
      <div className="!p-5 h-screen flex flex-col gap-3">
        <div className="flex jusitfy-between">
          <span className="text-xl">
            <b>Account Settings</b>
          </span>
          <button
            onClick={handleReset}
            className="!ms-auto flex items-center gap-1 cursor-pointer"
          >
            <b>Reset</b>
            <FontAwesomeIcon icon={faRotate} />
          </button>
        </div>
        {registration === "" ? (
          <div className="flex flex-col gap-3">
            <form onSubmit={handleRegistration} className="flex flex-col gap-3">
              <b className="text-yellow-200 text-center">
                We've detected that you haven't completed your registration.
                <br />
                As of now, the Main Page is accessible to everyone on the web.
                <br />
                To have your very own Gcash Managing System, please enter your
                registration code down below.
              </b>
              <div>
                <b className="text-gray-300">Registration Code</b>
                <input
                  type="text"
                  pattern="[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}"
                  required
                  placeholder="Paste the registration code that we sent to the email address you've provided."
                  className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
                />
              </div>
              <b className="md:!ms-auto md:w-1/4">
                <button
                  type="submit"
                  className="text-center w-full bg-red-600 px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
                >
                  SUBMIT
                </button>
              </b>
            </form>
            <b className="text-yellow-200 text-center">
              You don't have a registration code yet? Get one now for as low as
              ₱100.
            </b>
            <div className="flex flex-col lg:flex-row gap-4">
              <img
                src="../../public/mygcash.jpg"
                className="w-[320px] object-contain !mx-auto"
              />
              <form className="!p-2 !py-5 flex flex-col gap-5 w-full">
                <div>
                  <b className="text-gray-300">Name</b>
                  <input
                    type="text"
                    required
                    placeholder="Surname, First Name MI."
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
                  />
                </div>

                <div>
                  <b className="text-gray-300">Mobile Number</b>
                  <input
                    type="tel"
                    pattern="\+63\s?9\d{2}\s?\d{3}\s?\d{4}"
                    required
                    placeholder="ex. +63 9XX XXX XXXX"
                    value={number || ""}
                    onChange={(e) => setNumber(e.target.value)}
                    className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
                  />
                </div>

                <div>
                  <b className="text-gray-300">Email</b>
                  <input
                    type="email"
                    required
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
                  />
                </div>

                <div className="flex flex-col gap-5 justify-between">
                  <div
                    onClick={() => inputRef1.current?.click()}
                    className="md:!mx-auto w-full flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.2)] !p-5 rounded-lg transition-all duration-300 cursor-pointer"
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
                    className="md:hidden flex flex-col items-center gap-1 border border-dashed hover:border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.2)] !p-5 rounded-lg transition-all duration-300 cursor-pointer"
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

                <div>
                  <b className="text-gray-300">Reference No.</b>
                  <input
                    id="reference"
                    type="text"
                    pattern="\d{4}\s?\d{3}\s?\d{6}"
                    placeholder="ex. 1234 567 891011"
                    required
                    inputMode="numeric"
                    value={reference || ""}
                    onChange={(e) => setReference(e.target.value)}
                    className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
                  />
                </div>

                <div>
                  <b className="text-gray-300">Date</b>
                  <div className="relative">
                    <input
                      id="date"
                      type="text"
                      required
                      value={date || ""}
                      onChange={(e) => setDate(e.target.value)}
                      className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
                    />
                    <button
                      className={`text-sm font-bold text-gray-500 hover:text-blue-700 absolute right-5 top-[50%] transform -translate-y-1/2 ${
                        date !== getFormattedNow() ? "" : "invisible"
                      }`}
                      onClick={() => setDate(getFormattedNow())}
                    >
                      Use Date Today
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col font-bold gap-2 !px-5">
            <span>
              Registration Code: <b className="text-gray-300">{registration}</b>
            </span>
            <span>
              Name: <b className="text-gray-300">{name}</b>
            </span>
            <span>
              Mobile Number: <b className="text-gray-300">{mobileNumber}</b>
            </span>
            <span>
              Status: <b className="text-gray-300">ACTIVATED</b>
            </span>
            <span>
              Activation Date: <b className="text-gray-300">{activationDate}</b>
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
