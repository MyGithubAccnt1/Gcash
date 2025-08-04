export default function FetchData({ data, search, filter }) {
  let received = 0;
  let sent = 0;
  let profit = 0;
  if (data) {
    received = data
      .filter((item) => item.mode === "Received")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    sent = data
      .filter((item) => item.mode === "Sent")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    profit = data
      .reduce((acc, curr) => {
        const amount = Number(curr.amount);
        const fee = Math.ceil(amount / 500) * 5;
        return acc + fee;
      }, 0);
  }
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
      <table className="w-full bg-[rgba(255,255,255,0.1)] rounded-md">
        <thead className="border-b border-gray-300">
          <tr>
            <th className="w-[5%]"></th>
            <th className="w-[10%] !py-3"><b>Mode</b></th>
            <th className="w-[20%]"><b>To</b></th>
            <th className="w-[15%]"><b>Amount</b></th>
            <th className="w-[25%]"><b>Ref No.</b></th>
            <th className="w-[25%]"><b>Date</b></th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-300">
          {data.length > 0 ? (
            data
              .slice()
              .reverse()
              .map((item, index) =>
                filter && item.mode !== filter ? null : item.mode
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.to.toLowerCase().includes(search.toLowerCase()) ||
                  item.amount.toString().includes(search) ||
                  item.refNo.toString().includes(search) ||
                  item.date.toString().includes(search) ? (
                  <tr role="row" key={index} className={index % 2 === 0 ? "bg-[rgba(255,255,255,0.1)]" : ""}>
                    <td className="!py-2 border border-y-0 border-gray-300 border-l-0 text-center text-md text-gray-300">{index + 1}</td>
                    <td className="!px-2 border border-y-0 border-gray-300 text-sm">{item.mode}</td>
                    <td className="!px-2 border border-y-0 border-gray-300 text-sm">{item.to}</td>
                    <td className="!px-2 border border-y-0 border-gray-300 text-sm text-end">{item.amount}</td>
                    <td className="!px-2 border border-y-0 border-gray-300 text-sm">{item.refNo}</td>
                    <td className="!px-2 border border-y-0 border-gray-300 border-r-0 text-sm">{item.date}</td>
                  </tr>
                ) : null
              )
          ) : (
            <>
              <tr role="row">
                <td colSpan='6'>No records were found.</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
