
export default function FetchData() {
    return(
        <div className="h-full p-5! flex flex-col gap-2 overflow-y-auto">
            
            <div className="bg-[rgba(255,255,255,0.1)] rounded-md p-5!">
                <b>
                    Mode: Recieved<br/>
                    Date: Today, 12:10 PM<br/>
                    Amount: PHP 100.00<br/>
                    From: JE*****U C.<br/>
                    Number: +639495805084<br/>
                    Date: Today, 12:10 PM<br/>
                    Reference No.: 0030997745936<br/>
                </b>
            </div>

            <div className="bg-[rgba(255,255,255,0.1)] rounded-md p-5!">
                <b>
                    Mode: Sent<br/>
                    Amount: PHP 100.00<br/>
                    From: JE*****U C.<br/>
                    Number: +639495805084<br/>
                    Date: Today, 12:10 PM<br/>
                    Reference No.: 0030997745936<br/>
                </b>
            </div>

        </div>
    )
}