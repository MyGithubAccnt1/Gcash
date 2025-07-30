import Search from "./component/search";
import AddButton from "./component/addButton";
import FetchData from "./component/fetchData";
import { useEffect, useState } from "react";
import Loader from "./component/loader";

function App() {
  const [data, setData] = useState("");
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://script.google.com/macros/s/AKfycbxwtXHLh2V86qFbEHhOUacmTeIjM4tFumS4VC8S1QOJJFbo4GllcgLFCYMkDr6vrGle/exec');
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading && <Loader />}
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
