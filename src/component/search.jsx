import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faFilter } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    return(
        <div className="relative">
            <input type="search" id="Search" placeholder="Search" className="bg-[rgba(255,255,255,0.3)] rounded-full px-5! px-12! py-3!"/>
            <label for="Search" className='cursor-pointer'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-0 translate-x-[15%] top-[50%] -translate-y-[50%] rounded-full p-2! hover:bg-[rgba(0,0,0,0.1)]"/>
                <FontAwesomeIcon icon={faFilter} className="absolute right-0 -translate-x-[15%] top-[50%] -translate-y-[50%] rounded-full p-2! hover:bg-[rgba(0,0,0,0.1)]"/>
            </label>
        </div>
    )
}