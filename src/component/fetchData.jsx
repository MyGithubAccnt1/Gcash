import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAngleLeft,
  faAnglesRight,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

export default function FetchData({ data, search, filter }) {
  let received = 0;
  let sent = 0;
  let profit = 0;
  let filteredData = [];

  if (data.length > 0) {
    filteredData = data.filter((item) => {
      const matchesFilter = filter ? item.mode === filter : true;
      const matchesSearch =
        item.mode.toLowerCase().includes(search.toLowerCase()) ||
        item.to.toLowerCase().includes(search.toLowerCase()) ||
        item.amount.toString().includes(search) ||
        item.refNo.toString().includes(search) ||
        item.date.toString().includes(search);
      return matchesFilter && matchesSearch;
    });
  }

  if (filteredData.length > 0) {
    received = filteredData
      .filter((item) => item.mode === "Received")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    sent = filteredData
      .filter((item) => item.mode === "Sent")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    profit = filteredData.reduce((acc, curr) => {
      const amount = Number(curr.amount);
      const fee = Math.ceil(amount / 500) * 5;
      return acc + fee;
    }, 0);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);
  return (
    <div className="h-full !p-5 flex flex-col gap-2 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-2">
        <div className="bg-[rgba(255,255,255,0.1)] w-full !p-5 rounded-lg">
          <b>
            RECEIVED
            <br /> PHP {received.toLocaleString()}
          </b>
        </div>
        <div className="bg-[rgba(255,255,255,0.1)] w-full !p-5 rounded-lg">
          <b>
            SENT
            <br /> PHP {sent.toLocaleString()}
          </b>
        </div>
        <div className="bg-[rgba(255,255,255,0.1)] w-full !p-5 rounded-lg">
          <b>
            PROFIT
            <br /> PHP {profit.toLocaleString()}
          </b>
        </div>
      </div>
      <div className="w-full bg-[rgba(255,255,255,0.1)] rounded-md md:hidden flex-col">
        {paginatedData.length > 0 ? (
          paginatedData.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col !p-5 ${
                index % 2 === 0 ? "bg-[rgba(255,255,255,0.1)]" : ""
              }`}
            >
              <div className="text-center text-gray-300 font-bold">
                <b>{startIndex + index + 1}</b>
              </div>
              <div className="text-sm font-bold">
                Status: <b>{item.mode}</b>
              </div>
              <div className="text-sm font-bold">
                To: <b>{item.to}</b>
              </div>
              <div className="text-sm font-bold">
                Amount: <b>{item.amount}</b>
              </div>
              <div className="text-sm font-bold">
                Ref No.: <b>{item.refNo}</b>
              </div>
              <div className="text-sm font-bold">
                Date: <b>{item.date}</b>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="text-sm">
              <b>No records were found.</b>
            </div>
          </div>
        )}
        <div className="flex-col justify-end items-center !p-5">
          <div className="flex items-center gap-3 !mb-1">
            <label>
              <b className="text-sm">Rows Per Page:</b>
            </label>

            <div className="rounded-md border border-gray-300 !px-2 !py-1 bg-[rgba(255,255,255,0.1)]">
              <b className="text-sm">
                <select
                  className="outline-0"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="5" className="bg-[#9566FF] font-bold">
                    5
                  </option>
                  <option value="10" className="bg-[#9A7CFF] font-bold">
                    10
                  </option>
                  <option value="15" className="bg-[#9566FF] font-bold">
                    15
                  </option>
                  <option value="20" className="bg-[#9A7CFF] font-bold">
                    20
                  </option>
                </select>
              </b>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]">
              <b className="text-sm">
                {currentPage} / {totalPages}
              </b>
            </button>
            <div className="flex w-full justify-center items-center gap-1">
              <button
                className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                onClick={() => setCurrentPage(1)}
                disabled={currentPageSafe === 1}
              >
                <FontAwesomeIcon icon={faAnglesLeft} />
              </button>

              <button
                className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPageSafe === 1}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>

              <button
                className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPageSafe === totalPages}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </button>

              <button
                className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPageSafe === totalPages}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full bg-[rgba(255,255,255,0.1)] rounded-md hidden md:block">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="w-[5dvw]"></th>
            <th className="w-[10dvw] !py-3">
              <b>Mode</b>
            </th>
            <th className="w-[20dvw]">
              <b>To</b>
            </th>
            <th className="w-[15dvw]">
              <b>Amount</b>
            </th>
            <th className="w-[25dvw]">
              <b>Ref No.</b>
            </th>
            <th className="w-[25dvw]">
              <b>Date</b>
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-300">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <tr
                role="row"
                key={index}
                className={index % 2 === 0 ? "bg-[rgba(255,255,255,0.1)]" : ""}
              >
                <td className="!py-2 border-e border-gray-300 border-l-0 text-sm text-center text-gray-300">
                  <b>{startIndex + index + 1}</b>
                </td>
                <td className="!px-2 border-x border-gray-300 text-sm">
                  {item.mode}
                </td>
                <td className="!px-2 border-x border-gray-300 text-sm">
                  {item.to}
                </td>
                <td className="!px-2 border-x border-gray-300 text-sm text-end">
                  {item.amount}
                </td>
                <td className="!px-2 border-x border-gray-300 text-sm">
                  {item.refNo}
                </td>
                <td className="!px-2 border-s border-gray-300 border-r-0 text-sm">
                  {item.date}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="!p-2 text-gray-200 text-sm text-center"
              >
                No records were found.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr role="row">
            <td colSpan="6" className="!py-3">
              <div className="flex justify-end items-center gap-3 !px-5">
                <label>
                  <b className="text-sm">Rows Per Page:</b>
                </label>

                <div className="rounded-md border border-gray-300 !px-2 !py-1 bg-[rgba(255,255,255,0.1)]">
                  <b className="text-sm">
                    <select
                      className="outline-0"
                      value={rowsPerPage}
                      onChange={(e) => {
                        setRowsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value="5" className="bg-[#9566FF] font-bold">
                        5
                      </option>
                      <option value="10" className="bg-[#9A7CFF] font-bold">
                        10
                      </option>
                      <option value="15" className="bg-[#9566FF] font-bold">
                        15
                      </option>
                      <option value="20" className="bg-[#9A7CFF] font-bold">
                        20
                      </option>
                    </select>
                  </b>
                </div>

                <button
                  className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPageSafe === 1}
                >
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </button>

                <button
                  className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPageSafe === 1}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                <button className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]">
                  <b className="text-sm">
                    {currentPage} / {totalPages}
                  </b>
                </button>

                <button
                  className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPageSafe === totalPages}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>

                <button
                  className="rounded-md border border-gray-300 !px-3 !py-1 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.3)]"
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPageSafe === totalPages}
                >
                  <FontAwesomeIcon icon={faAnglesRight} />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
