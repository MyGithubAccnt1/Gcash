import Loader from "../component/loader";
import { useState, useEffect } from "react";
import { GS_REGISTRATION_URL } from "../utils/constant";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

function Settings() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [registration, setRegistration] = useState('');
  const [activationDate, setActivationDate] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('name') || '');
    setMobileNumber(localStorage.getItem('mobile_number') || '');
    setRegistration(localStorage.getItem('registration') || '');
    setActivationDate(localStorage.getItem('activation_date') || '');
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
      localStorage.removeItem('name');
      localStorage.removeItem('mobile_number');
      localStorage.removeItem('registration');
      localStorage.removeItem('activation_date');

      localStorage.setItem('name', data[0]);
      localStorage.setItem('mobile_number', data[1]);
      localStorage.setItem('registration', data[2]);
      localStorage.setItem('status', data[3]);
      localStorage.setItem('activation_date', data[4]);

      setName(data[0]);
      setMobileNumber(data[1]);
      setRegistration(data[2]);
      setActivationDate(data[4]);
    } catch (error) {
      handleReset();
      alert.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('mobile_number');
    localStorage.removeItem('registration');
    localStorage.removeItem('activation_date');
    setName('');
    setMobileNumber('');
    setRegistration('');
    setActivationDate('');
  }
  return (
    <>
      {loading && <Loader />}
      <div className="!p-5 h-screen flex flex-col gap-3">
        <div className="flex jusitfy-between">
          <span className="text-xl"><b>Account Settings</b></span>
          <button onClick={handleReset} className="!ms-auto flex items-center gap-1 cursor-pointer">
            <b>Reset</b>
            <FontAwesomeIcon icon={faRotate} />
          </button>
        </div>
        { registration === '' ? (
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
                className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
              />
            </div>
            <b className="md:!ms-auto">
              <button
                type="submit"
                className="text-center w-full bg-red-600 px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
              >
                SUBMIT
              </button>
            </b>
            <b className="text-yellow-200 text-center">
              You don't have a registration code yet?{" "}
              <a
                href="https://www.facebook.com/MVB17/"
                className="text-white hover:underline transition-all duration-300"
                target="_blank"
              >
                Get one now for as low as ₱100.
              </a>{" "}
              1 time payment only, no monthly fees!
            </b>
          </form>
        ) : (
          <div className="flex flex-col font-bold gap-2 !px-5">
            <span>Registration Code: <b className="text-gray-300">{registration}</b></span>
            <span>Name: <b className="text-gray-300">{name}</b></span>
            <span>Mobile Number: <b className="text-gray-300">{mobileNumber}</b></span>
            <span>Status: <b className="text-gray-300">ACTIVATED</b></span>
            <span>Activation Date: <b className="text-gray-300">{activationDate}</b></span>
          </div>
        )}
      </div>
    </>
  );
}

export default Settings;
