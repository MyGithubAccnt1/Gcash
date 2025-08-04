import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
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
            className={`h-screen flex flex-col items-center !py-5 gap-1 text-black font-bold w-[320px] bg-[rgba(255,255,255,0.1)] absolute md:relative md:left-0 top-0 transition-all duration-500 ${
              button ? "left-0" : "-left-[100%]"
            }`}
          >
            <NavLink to='/' className='bg-[rgba(255,255,255,0.2)] w-full !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]'>Home</NavLink>
            <NavLink to='/kanban-board' className='bg-[rgba(255,255,255,0.2)] w-full !ps-5 !py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.3)]'>Feature Discussion</NavLink>
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
