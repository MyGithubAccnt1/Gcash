import Search from "./component/search";
import AddButton from "./component/addButton";
import FetchData from "./component/fetchData";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("data"));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "data") {
        try {
          const newData = JSON.parse(e.newValue);
          if (Array.isArray(newData)) {
            setData(newData);
          }
        } catch (err) {
          console.error("Error parsing localStorage data:", err);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <>
      <div className="h-screen flex bg-gradient-to-t from-violet-500 to-blue-500 text-white relative">
        {/* <div className="h-screen flex flex-col w-[320px] bg-[rgba(255,255,255,0.1)]">
          
        </div> */}
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-center mb-15!">
            <img src="cashg.png" className="h-15" />
            <b className="text-[35px]">Cash</b>
          </div>

          <div className="flex flex-col items-center md:flex-row md:justify-center md:items-start gap-2 mb-5!">
            <Search setSearch={setSearch} setFilter={setFilter} />
            <AddButton data={data} setData={setData} />
          </div>

          <div className="flex-grow overflow-hidden">
            <FetchData
              data={data}
              setData={setData}
              search={search}
              filter={filter}
            />
          </div>
        </div>
        
      </div>
    </>
  );
}

export default App;
