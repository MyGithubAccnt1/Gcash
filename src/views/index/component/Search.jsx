import { useState } from "react";
import { FiSearch } from 'react-icons/fi'
import { TiFilter } from 'react-icons/ti'
import Button from './Button'

export default function Search({ setSearch, setFilter, options }) {
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
      setMode("");
    } else {
      setFilter(mode);
    }
    setFilterModal(false);
  };
  
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

        <label htmlFor="Search" className="p-3 rounded-full cursor-pointer absolute left-1 top-1/2 transform -translate-y-1/2">
          <FiSearch />
        </label>

        <span className="p-3 rounded-full cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={() => {
            setFilterModal(true);
          }}>
          <TiFilter />
        </span>
      </form>

      {filterModal && (
        <form
          onSubmit={handleFilter}
          onClick={() => setFilterModal(false)}
          className="fixed inset-0 bg-[rgba(0,0,0,0.2)] backdrop-blur-[6px] rounded flex items-center justify-center z-50 text-black"
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
                {options.map((option, index) => {
                  return (
                    <option
                      key={index}
                      className="bg-[rgba(0,0,0,0.1)]"
                      value={option.value}
                      disabled={option.disabled}
                    >
                      {option.value}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex justify-between gap-1">
              <Button
                className={`text-black hover:bg-[rgba(0,0,0,0.1)]`}
                onClick={() => setFilterModal(false)}
              >
                <b>Cancel</b>
              </Button>
              <button
                type="submit"
                className="text-white bg-[#E50000] !px-5 !py-3 rounded-lg hover:rounded-[50px] transition-all duration-300 cursor-pointer"
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
