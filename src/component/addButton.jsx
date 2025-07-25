import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default function AddButton() {
    return(
        <div className="flex items-center gap-1 bg-[#E50000] px-5! py-3! rounded-lg hover:rounded-full transition-all duration-300 cursor-pointer">
            <b>Add New Record</b>
            <FontAwesomeIcon icon={faPlus} />
        </div>
    )
}