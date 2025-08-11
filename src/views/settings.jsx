function Settings() {
  return (
    <>
      <div className="!p-5 h-screen flex flex-col gap-3">
        <b>Account Settings</b>
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
            className="outline-0 bg-[rgba(255,255,255,0.3)] text-black !p-2 w-full"
          />
        </div>
        <button className="md:w-1/4 md:!ms-auto text-center bg-red-600 px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer">
          SUBMIT
        </button>
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
      </div>
    </>
  );
}

export default Settings;
