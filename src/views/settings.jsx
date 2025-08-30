import Loader from "../component/loader";
import { useState, useEffect, useRef } from "react";
import { GS_REGISTRATION_URL } from "../utils/constant";
import axios from "axios";
import { GrPowerReset } from "react-icons/gr";
import Button from "../component/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [registration, setRegistration] = useState("");
  const [activationDate, setActivationDate] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    setMobileNumber(localStorage.getItem("mobile_number") || "");
    setRegistration(localStorage.getItem("registration") || "");
    setActivationDate(localStorage.getItem("activation_date") || "");
    localStorage.getItem("registration") ??
      toast.error(
        "We've detected that you haven't completed your registration."
      );
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
      localStorage.setItem("name", data[0]);
      localStorage.setItem("mobile_number", data[1]);
      localStorage.setItem("registration", data[2]);
      localStorage.setItem("status", data[3]);
      localStorage.setItem("activation_date", data[4]);
      toast.success("Thank you for using Gcash Managing System by MVB.");
      setName(data[0]);
      setMobileNumber(data[1]);
      setRegistration(data[2]);
      setActivationDate(data[4]);
    } catch (error) {
      handleReset();
      toast.error(error.response.data.message);
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

  return (
    <>
      <div className="flex justify-between items-center px-5">
        <h6 className="font-bold text-xl">Account Settings</h6>
        <Button
          onClick={handleReset}
          className={`hover:bg-[rgba(0,0,0,0.1)] font-bold transition-all duration-300`}
        >
          <span className="flex items-center gap-2">
            Reset
            <GrPowerReset />
          </span>
        </Button>
      </div>
      {registration === "" ? (
        <div className="flex flex-col px-5 gap-3">
          <form onSubmit={handleRegistration} className="flex flex-col gap-3">
            <b className="text-gray-300">
              The Main Page is accessible to everyone on the web.
              <br />
              To have your very own Gcash Managing System, please enter your
              registration code down below.
            </b>
            <div className="space-y-3">
              <div className="bg-[rgba(0,0,0,0.1)] p-5 rounded-lg">
                <label
                  htmlFor="registration"
                  className="uppercase font-bold text-sm select-none"
                >
                  Registration
                </label>
                <input
                  name="registration"
                  type="text"
                  pattern="[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}"
                  placeholder="Paste the registration code that we`ve sent to the email address you've provided."
                  className="outline-none w-full bg-transparent"
                  required
                />
              </div>
            </div>
            <b className="md:!ms-auto md:w-1/4">
              <Button
                type={"submit"}
                className={`bg-gradient-to-b from-red-300 via-red-400 to-red-500 text-white w-full font-bold transition-all duration-300
                hover:rounded-[50px]`}
              >
                Submit
              </Button>
            </b>
          </form>
          <b className="text-gray-300 text-center">
            This system is still under development. Expect better quality and
            more features in the near future. Any feedback is highly
            appreciated.
          </b>
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
      <ToastContainer position="top-center" autoClose={3000} />
      {loading && <Loader />}
    </>
  );
}

export default Settings;
