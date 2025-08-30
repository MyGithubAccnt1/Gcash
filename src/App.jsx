import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { ImHome } from "react-icons/im";
import { GrUserSettings } from "react-icons/gr";
import Burger from "./component/Burger";
function App() {
  const [button, setButton] = useState(false);
  return (
    <>
      <div className="h-[100dvh] flex flex-col bg-gradient-to-t from-violet-500 to-blue-500 text-white">
        <div className="flex h-full w-full relative overflow-hidden">
          <div
            className={`z-5 h-screen flex flex-col items-center gap-[2px] text-gray-500 font-bold w-[320px] bg-gradient-to-t from-violet-500 to-blue-500 md:bg-none md:bg-[rgba(255,255,255,0.1)] absolute md:relative md:left-0 top-0 transition-all duration-500 ${
              button ? "left-0" : "-left-[100%]"
            }`}
          >
            <NavLink
              onClick={() => setButton(false)}
              to="/"
              tabIndex={-1}
              className="text-white w-full !py-3 flex items-center justify-center"
            >
              <img src="cashg.png" className="h-15" />
              <b className="text-[35px]">Cash MS</b>
            </NavLink>

            <NavLink
              onClick={() => setButton(false)}
              to="/"
              className="bg-[rgba(255,255,255,0.2)] text-white w-full flex items-center gap-4 !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]"
            >
              <ImHome />
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Main Page
              </h1>
            </NavLink>

            <NavLink
              onClick={() => setButton(false)}
              to="/account-setting"
              className="bg-[rgba(255,255,255,0.2)] text-white w-full flex items-center gap-4 !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]"
            >
              <GrUserSettings />
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Account Settings
              </h1>
            </NavLink>
          </div>
          <div className="flex flex-col flex-1 overflow-y-auto md:p-5">
            <Burger button={button} setButton={setButton} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
