import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { searchUser } from "../lib/services"
import SearchedUser from "../components/SearchedUser"
import { socket } from "./AppLayout"

function AddChat({onClick}){
    const [username,setusername] = useState()
    const [searcheduser,setsearcheduser] = useState()
    const {mutate:SearchUser,isLoading} = useMutation({
        mutationFn:searchUser,
        onSuccess:(user)=>{
          setsearcheduser(user)
        },
        onError:(error)=>{
            throw new Error(error.message)
        } 
    })
  
    function handlesearchusername(e){
        e.preventDefault()
        if(!username) return;
       SearchUser(username)
      
    }
    function handleAddtoChat(){

    }
    return <div className="bg-white border border-gray-300 left-40  md:left-auto   md:w-auto shadow-2xl  rounded-md p-4 font-poppins text-sm  absolute z-50   ">
           <form className="flex justify-between gap-3 mt-4" onSubmit={handlesearchusername}>

           <input type="text" placeholder="Search User to Chat" className="p-2 w-auto  outline-none rounded-md border border-gray-400 bg-purple-50" id="username" name="username"  onChange={(e)=> setusername(e.target.value)}/>
           <button className="bg-purple-500 text-white p-1 font-semibold text-xs hover:bg-purple-700 rounded-md px-2 ">Search User</button>
           </form>
           <div className="mt-5">
            <ul>

                {searcheduser?.map((user)=><SearchedUser searcheduser={user} key={user.id}/>)}
            </ul>
           </div>
           <button className="absolute top-2 right-2 hover:bg-purple-300 rounded-md text-slate-950" onClick={onClick}><CgClose className="w-5 h-5"/></button>
    </div>
}

export default AddChat