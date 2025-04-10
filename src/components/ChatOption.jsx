// View Details, Clear Chat, Block User

import { useMutation } from "@tanstack/react-query";
import { createContext } from "react";
import { BsEyeFill } from "react-icons/bs";
import { CgBlock } from "react-icons/cg";
import { GrClearOption } from "react-icons/gr";
import { deleteChat } from "../lib/services";
import { useParams, useSearchParams } from "react-router";

const ChatContext = createContext();


function ChatOption({chatId,chats,CloseModel}) {
  const [searchParams,setsearchParams] = useSearchParams()
  const {uuid} = useParams()
  const {mutate,loading} = useMutation({
    mutationFn:deleteChat
  })
  function handleclearChat(){
    mutate({chatId,uuid})
  }
  function handleviewchatUser(){
    if(searchParams.get("account")){
      searchParams.delete("account")
    }
    searchParams.set("view",true)
    
    setsearchParams(searchParams)
  }
  return (
    <div className="flex flex-col bg-gray-100 p-1 rounded-md text-xs ">
      {/* <button className="flex gap-1 items-center p-1 hover:bg-gray-600 hover:text-gray-100">
        <CgBlock className="w-4 h-4" />
        Block User
      </button> */}
      <button className="flex gap-1 items-center p-1 hover:bg-gray-600 hover:text-gray-100" onClick={()=>{handleviewchatUser();CloseModel()}}>
        <BsEyeFill className="w-3 h-3" />
        View Details{" "}
      </button>
      <button className="flex gap-1 items-center p-1 hover:bg-gray-600 hover:text-gray-100" onClick={()=> {handleclearChat();CloseModel()}} disabled={chats?.length === 0}>
        <GrClearOption className="h-3 w-3" />
        Clear Chats
      </button>
    </div>
  );
}

export default ChatOption;
