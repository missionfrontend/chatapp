import { useEffect, useState } from "react";
import { BiDotsHorizontalRounded, BiDotsVertical } from "react-icons/bi";
import { FaVideo } from "react-icons/fa";
import { MdAccountCircle, MdOutlineSearch } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { socket } from "../ui/AppLayout";
import ChatOption from "./ChatOption";
import ChatModal from "../ui/ChatModal";
import {
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import { BsArrowLeftCircle } from "react-icons/bs";

function ChatHeader({
  openeduuid,
  setSearchmessage,
  handleSearchMessage,
  chatId,
  chats,
}) {
  const [online, setonline] = useState();
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [searchParams, setsearchParams] = useSearchParams();
  useEffect(
    function () {
      socket.on("online", ({status,userId}) => {
        setonline({status,userId});
        
      });
    },
    [socket]
  );

  function handleback() {
    navigate("/applayout", { replace: true });
  }
  function handleAccount() {
    if(searchParams.get("view")){
        searchParams.delete("view")
    }
    searchParams.set("account", true);
    setsearchParams(searchParams);
  }
  return (
    <div className="flex justify-between p-3 items-center border-b border-b-gray-200 ">
      <div className="flex gap-4 items-center">
        <img
          src={openeduuid?.avatar}
          className=" w-10 h-10 rounded-full ring-1 ring-gray-300"
        />
        <h2 className="text-sm">{openeduuid?.fullName}</h2>
        {online && uuid === online?.userId && (
          <span className="text-xs text-green-500 animate-pulse">Online</span>
        )}
      </div>
      <div className="flex gap-4 items-center text-xs">
        <input
          type="text"
          className="bg-gray-100 rounded-md py-2 outline-none px-2 hidden md:block"
          placeholder="Search Message"
          onChange={(e) => setSearchmessage(e.target.value)}
        />
        <button onClick={() => handleSearchMessage()} className="hidden md:block">
          <MdOutlineSearch className="w-5 h-5 fill-gray-400" />
        </button>
        {/* <button className=" p-2">
                <FaVideo className="fill-gray-500 w-5 h-5"/>
            </button> */}
        <button
          className=" p-2 hover:bg-gray-200 rounded-md hidden md:block"
          onClick={() => handleAccount()}
        >
          <VscAccount className="fill-gray-500 w-4 h-4" />
        </button>
        <ChatModal>
          <ChatModal.Button id={uuid}>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <BiDotsHorizontalRounded className="w-4 h-4" />
            </button>
          </ChatModal.Button>
          <ChatModal.Window id={uuid}>
            <ChatOption chatId={chatId} uuid={openeduuid?.uuid} chats={chats} />
          </ChatModal.Window>
        </ChatModal>
        <button
          className="hover:bg-black hover:text-white rounded-full p-1 group/backtooltip relative duration-500"
          onClick={() => handleback()}
        >
          <BsArrowLeftCircle className="w-6 h-6" />
          <p className="group-hover/backtooltip:block hidden absolute top-9 rounded-md  text-white  bg-stone-800 w-20 p-1 right-0 ">
            Go Back
          </p>
        </button>
      </div>
    </div>
  );
}

export default ChatHeader;

// Doubly Linked List
// Nodes Class
// Search Input search--> match-->with-->chatmessage-->result-->insert one by one automaticaly to nodes--> as next-->prev->
// for each message inert node on hadle search
