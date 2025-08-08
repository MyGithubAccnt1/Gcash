import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
export default function DownloadButton({ data, search, filter }) {
    function handleDownload() {
        if (data.length > 0) {
            const filteredData = data.filter((item) => {
                const matchesFilter = filter ? item.mode === filter : true;
                const matchesSearch = item.mode.toLowerCase().includes(search.toLowerCase()) || item.to.toLowerCase().includes(search.toLowerCase()) || item.amount.toString().includes(search) ||  item.refNo.toString().includes(search) || item.date.toString().includes(search);
                return matchesFilter && matchesSearch;
            });

            const updatedData = filteredData.map((item) => {
                const amount = Number(item.amount);
                const fee = Math.ceil(amount / 500) * 5;

                return {
                    ...item,
                    profit: fee,
                };
            });

            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const filename = `Gcash-${month}${day}${year}.xlsx`;

            const worksheet = XLSX.utils.json_to_sheet(updatedData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'GCash');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, filename);
        } else {
            alert('No records were found.');
        }
        
    }
    return(
        <>
            <button
                onClick={() => handleDownload()}
                className="flex items-center gap-1 bg-green-600 px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer"
            >
                <b>Download</b>
                <FontAwesomeIcon icon={faDownload} />
            </button>
        </>
    )
}