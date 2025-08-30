import { Link, useNavigate } from "react-router-dom";
import "./Notfound.css";
import Button from "../component/Button";
function Notfound() {
  const navigate = useNavigate();

  const handleBackToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <div className="h-[100dvh] w-[100dvw] flex flex-col justify-center items-center text-center !px-2">
        <div
          className="error text-[#5a5c69] text-[7rem] relative line-height-[1] w-[12.5rem] mx-auto!"
          data-text="404"
        >
          404
        </div>
        <p className="text-[1.25rem] font-bold line-height-[1.5] text-gray-800 mb-5!">
          Page Not Found
        </p>
        <p className="text-gray-500">
          It looks like you found a glitch in the matrix...
        </p>
        <Button
          onClick={handleBackToHome}
          className={`bg-gradient-to-b from-red-300 via-red-400 to-red-500 text-white 
                hover:rounded-[50px] w-full md:w-1/2 xl:w-1/4`}
        >
          Return Home
        </Button>
      </div>
    </>
  );
}

export default Notfound;
