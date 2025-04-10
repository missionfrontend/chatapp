import { FaSearch } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";

function Search(){
  return <div className="flex-1 flex items-center gap-2 bg-gray-200 border border-gray-400 rounded-md justify-between text-sm">
        <IoMdSearch className="w-6 h-6 mx-2 fill-gray-500"/>
         <input type="text" className="py-2 w-full rounded-e-full bg-gray-200 outline-none" placeholder="Search messages or users "/>
  </div>
}

export default Search;