import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  // faBookJournalWhills,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import Burger from "./component/burger";
function App() {
  const [button, setButton] = useState(false);
  return (
    <>
      <div className="h-[100dvh] flex flex-col bg-gradient-to-t from-violet-500 to-blue-500 text-white">
        <div className="flex flex-1 relative overflow-hidden">
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
              className="bg-[rgba(255,255,255,0.2)] w-full flex !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]"
            >
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <FontAwesomeIcon icon={faHome} className="text-white !me-3" />
                Main Page
              </h1>
            </NavLink>

            {/* <NavLink
              onClick={() => setButton(false)}
              to="/kanban-board"
              className="bg-[rgba(255,255,255,0.2)] w-full flex !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]"
            >
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <FontAwesomeIcon
                  icon={faBookJournalWhills}
                  className="text-white !me-3"
                />
                Feature Discussion
              </h1>
            </NavLink> */}

            <NavLink
              onClick={() => setButton(false)}
              to="/account-setting"
              className="bg-[rgba(255,255,255,0.2)] w-full flex !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]"
            >
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <FontAwesomeIcon icon={faGear} className="text-white !me-3" />
                Account Settings
              </h1>
            </NavLink>
          </div>

          <div className="flex flex-col w-full overflow-auto md:!py-5">
            <Burger button={button} setButton={setButton} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
