import { useEffect, useState } from "react";
import Search from "../component/search";
import AddButton from "../component/addButton";
import DownloadButton from "../component/downloadButton";
import FetchData from "../component/fetchData";
import Loader from "../component/loader";
import { GS_GCASH_URL } from "../utils/constant";
function Home() {
    const [data, setData] = useState("");
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = () => {
            const local = localStorage.getItem('gcash_data');
            const data = JSON.parse(local);
            const isValidData = Array.isArray(data);
            setData(isValidData ? data : []);

            const gcash_gs = async () => {
                if (!isValidData) setLoading(true);

                try {
                    const response = await fetch(GS_GCASH_URL);
                    const result = await response.json();
                    const isValidResult = Array.isArray(result) ? result : [];

                    const isDifferent = JSON.stringify(data) !== JSON.stringify(isValidResult);

                    if (isDifferent) {
                        setData(isValidResult);
                        localStorage.setItem('gcash_data', JSON.stringify(isValidResult));
                    }
                } catch (error) {
                    console.error('Failed to fetch:', error);
                } finally {
                    if (!isValidData) setLoading(false);
                }
            };

            gcash_gs();
        };

        fetchData();
    }, []);
    return(
        <>
            {loading && <Loader />}
            <div className="flex flex-col !px-5 items-center lg:flex-row lg:justify-center lg:items-start gap-2 mb-5!">
                <Search setSearch={setSearch} setFilter={setFilter} />
                <div className="flex flex-col w-full items-end gap-2 md:flex-row md:justify-end md:items-center">
                    <AddButton data={data} setData={setData} />
                    <DownloadButton data={data} search={search} filter={filter} />
                </div>
            </div>

            <div className="flex-grow overflow-hidden">
                <FetchData
                data={data}
                setData={setData}
                search={search}
                filter={filter}
                />
            </div>
        </>
    )
}

export default Home