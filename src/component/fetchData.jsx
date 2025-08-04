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
      <div className="flex gap-2">
        <div className="bg-[rgba(255,255,255,0.1)] w-1/3 !p-5 rounded-lg">
          <b>
            RECEIVED
            <br /> PHP {received.toLocaleString()}
          </b>
        </div>
        <div className="bg-[rgba(255,255,255,0.1)] w-1/3 !p-5 rounded-lg">
          <b>
            SENT
            <br /> PHP {sent.toLocaleString()}
          </b>
        </div>
        <div className="bg-[rgba(255,255,255,0.1)] w-1/3 !p-5 rounded-lg">
          <b>
            PROFIT
            <br /> PHP {profit.toLocaleString()}
          </b>
        </div>
      </div>
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
              <div
                key={index}
                className="bg-[rgba(255,255,255,0.1)] rounded-md p-5!"
              >
                <b>
                  Mode: {item.mode}
                  <br />
                  {item.to && (
                    <>
                      To: {item.to}
                      <br />
                    </>
                  )}
                  Amount: PHP {item.amount}
                  <br />
                  Ref No.: {item.refNo}
                  <br />
                  Date: {item.date}
                  <br />
                </b>
              </div>
            ) : null
          )
      ) : (
        <div className="bg-[rgba(255,255,255,0.1)] rounded-md p-5!">
          <i>No records were found.</i>
        </div>
      )}
    </div>
  );
}
