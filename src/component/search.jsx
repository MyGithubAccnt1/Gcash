import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Search({ setSearch, setFilter }) {
  const [filterModal, setFilterModal] = useState(false);
  const [mode, setMode] = useState(null);
  const [find, setFind] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(find);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (mode === "All") {
      setMode(null);
    } else {
      setFilter(mode);
    }
    setFilterModal(false);
  };

  const modeOptions = [
    {value: 'All'},
    {value: 'Sent'},
    {value: 'Received'},
    {value: 'Eletric Bill'},
    {value: 'Internet Bill'},
    {value: 'Water Bill'},
    {value: 'Others'},
  ]
  return (
    <>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="search"
          id="Search"
          placeholder="Search"
          value={find}
          onChange={(e) => setFind(e.target.value)}
          className="bg-[rgba(255,255,255,0.3)] rounded-full px-5! px-12! py-3!"
        />

        <label htmlFor="Search" className="cursor-pointer">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-0 translate-x-[15%] top-[50%] -translate-y-[50%] rounded-full p-2! hover:bg-[rgba(0,0,0,0.1)]"
          />
        </label>

        <span className="cursor-pointer">
          <FontAwesomeIcon
            onClick={() => {
              setFilterModal(true);
            }}
            icon={faFilter}
            className="absolute right-0 -translate-x-[15%] top-[50%] -translate-y-[50%] rounded-full p-2! hover:bg-[rgba(0,0,0,0.1)]"
          />
        </span>
      </form>

      {filterModal && (
        <form
          onSubmit={handleFilter}
          onClick={() => setFilterModal(false)}
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50 text-black"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white !p-5 rounded shadow-lg flex flex-col gap-4"
          >
            <div className="bg-[rgba(0,0,0,0.1)] !p-5 rounded-lg relative">
              <label
                className="absolute text-gray-500 transition-all duration-300 text-sm font-bold top-1"
              >
                Mode
              </label>
              <select
                className="outline-none w-full"
                value={mode || ""}
                onChange={(e) => setMode(e.target.value)}
              >
                {modeOptions.map((option, index) => {
                  return (
                    <option
                      key={index}
                      className="bg-[rgba(0,0,0,0.1)]"
                      value={option.value}
                    >
                      {option.value}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="hover:bg-[rgba(0,0,0,0.1)] !px-5 !py-3 rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => setFilterModal(false)}
              >
                <b>Cancel</b>
              </button>
              <button
                type="submit"
                className="text-white bg-[#E50000] !px-5 !py-3 rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
              >
                <b>Apply Filters</b>
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
