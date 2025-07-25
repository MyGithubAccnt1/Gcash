import Search from "./component/search"
import AddButton from "./component/addButton"
import FetchData from "./component/fetchData"

function App() {

  return (
    <div className="h-screen flex flex-col bg-gradient-to-t from-violet-500 to-blue-500 text-white">
      
      <div className="flex items-center justify-center mb-15!">
        <img src="cashg.png" className="h-15"/>
        <b className="text-[35px]">Cash</b>
      </div>
     
      <div className='flex flex-col items-center md:flex-row md:justify-center md:items-start gap-2 mb-5!'>
        <Search />
        <AddButton />
      </div>

      <div className="flex-grow overflow-hidden">
        <FetchData />
      </div>

    </div>
  )
}

export default App
