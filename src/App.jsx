import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBookJournalWhills, faGear } from "@fortawesome/free-solid-svg-icons";
import Burger from "./component/burger";
function App() {
  const [button, setButton] = useState(false);
  return (
    <>
      <div className="h-[100dvh] flex flex-col bg-gradient-to-t from-violet-500 to-blue-500 text-white">
        <NavLink to='/' className="flex items-center justify-center">
          <img src="cashg.png" className="h-15" />
          <b className="text-[35px]">Cash</b>
        </NavLink>

        <Burger button={button} setButton={setButton} />

        <div className="flex flex-1 relative overflow-hidden">
          <div
            className={`h-screen flex flex-col items-center gap-[2px] text-gray-500 font-bold w-[320px] bg-[rgba(255,255,255,0.1)] absolute md:relative md:left-0 top-0 transition-all duration-500 ${
              button ? "left-0" : "-left-[100%]"
            }`}
          >
            <NavLink to='/' className='bg-[rgba(255,255,255,0.2)] w-full flex !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]'>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <FontAwesomeIcon icon={faHome} className="text-white !me-3"/>Main Page
              </h1>
            </NavLink>

            <NavLink to='/kanban-board' className='bg-[rgba(255,255,255,0.2)] w-full flex !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]'>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <FontAwesomeIcon icon={faBookJournalWhills} className="text-white !me-3"/>Feature Discussion
              </h1>
            </NavLink>

            <NavLink to='/kanban-board' className='bg-[rgba(255,255,255,0.2)] w-full flex !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]'>
              <h1 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                <FontAwesomeIcon icon={faGear} className="text-white !me-3"/>Account Setting
              </h1>
            </NavLink>
          </div>

          <div className="flex flex-col w-full overflow-auto">
            <Outlet/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
