import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TiFilter } from "react-icons/ti";
import Button from "./Button";

export default function Search({ setSearch, setFilter }) {
  const [find, setFind] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(find);
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

        <label
          htmlFor="Search"
          className="p-3 rounded-full cursor-pointer absolute left-1 top-1/2 transform -translate-y-1/2"
        >
          <FiSearch />
        </label>

        <span
          className="p-3 rounded-full cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2"
          onClick={setFilter}
        >
          <TiFilter />
        </span>
      </form>
    </>
  );
}
