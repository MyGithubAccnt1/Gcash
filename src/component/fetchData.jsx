export default function FetchData({ data, search, filter }) {
  return (
    <div className="h-full p-5! flex flex-col gap-2 overflow-y-auto">
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
