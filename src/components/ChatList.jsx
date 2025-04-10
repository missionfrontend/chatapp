import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

function convertTime(data){
  const newDate =  new Date(data).toLocaleTimeString().toUpperCase()
  return newDate
}
function ChatList({chats,recentmessage,setlastmessage,show}){
  const {receiverId,lastmessage,fullName,avatar,chatId,updatedat} = chats
  const [searchParams,setsearchParams] = useSearchParams()
  
  const paramschatId = searchParams.get("chatId")
  function handleopenChat(){
    searchParams.set("chatId",chatId)
    setsearchParams(searchParams)
    // window.location.href = window.location.href + `${chatId}`
  }
  useEffect(function(){
    
      
        
        if(recentmessage?.chatId === paramschatId){
          setlastmessage("")
        }
      

      
  
  },[paramschatId])
  // const messageSlice = recentmessage?.message ? rece 
  return <Link to={`/applayout/${receiverId}?chatId=${chatId}`} className={`grid grid-cols-5  gap-4 p-3 justify-between ${paramschatId === chatId ? "bg-gray-200" : ""}  border-b border-b-gray-300 hover:bg-gray-200 overflow-hidden`} onClick={()=>handleopenChat()} >
         <div className=" flex md:gap-5 gap-2 col-span-4 relative transition-all duration-300">
         <img src={avatar} className="w-12 h-12 rounded-full ring-1 ring-gray-400"/>
         {recentmessage?.message && recentmessage?.chatId === chatId && <div className="w-3 h-3  bg-blue-500  absolute rounded-full top-0 ring-1"></div>}
        <div className={`md:flex flex-col gap-2 ${show ? "flex flex-col transition-all duration-300" : "hidden"} `}>

         <h1 className="text-xs font-semibold tracking-wider">{fullName}</h1>
         <p className={`text-xs overflow-x-hidden w-40 ${recentmessage?.message && recentmessage?.chatId === chatId ? "text-blue-500 font-semibold":"text-gray-500 "}`}>{recentmessage?.chatId === chatId ? recentmessage.message  :lastmessage?.message || lastmessage?.mimeType}</p>
        </div>
         
         </div>
         <p className="text-xs text-gray-500 hidden md:block">{convertTime(updatedat)}</p>
  </Link>
}

export default ChatList;