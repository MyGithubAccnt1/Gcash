import Loader from "../component/loader";
import { useState } from "react";
import { GS_REGISTRATION_URL } from "../utils/constant";
import axios from "axios";

function Settings() {
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    const newEntry = {
      code: e.target[0].value,
    };
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("data", JSON.stringify(newEntry));

      await axios.post(GS_REGISTRATION_URL, params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    } finally {
      // setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="!p-5 h-screen flex flex-col gap-3">
        <b>Account Settings</b>
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
      </div>
    </>
  );
}

export default Settings;
