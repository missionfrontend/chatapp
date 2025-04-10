import { useParams, useSearchParams } from "react-router";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getchats, searchuseruuid, sendChat } from "../lib/services";
import { useContext, useEffect, useRef, useState } from "react";
import { useUser } from "../Login/useUser";
import { useFetchChats } from "./useFetchChats";
import { useSendChat } from "./useSendChat";
import { supabase } from "../lib/supabase";
import { socket } from "../ui/AppLayout";
import { LoggedContext } from "../components/LoggedContext";
import { RiDropdownList } from "react-icons/ri";
import { FaClosedCaptioning } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import { BiDownload } from "react-icons/bi";
import { IoDownload } from "react-icons/io5";
import { MdOutlineDownload } from "react-icons/md";

class Node {
  constructor(value) {
    this.next = null;
    this.prev = null;
    this.message = value;
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  insert(value) {
    let current = this.head;
    const newNode = new Node(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }
  show() {
    let current = this.head;

    while (current.next) {
      current = current.next;
      console.log(current.value);
    }
  }
}

function Chat() {
  const [image, setimage] = useState(null);
  const [text, settext] = useState("");
  const [typing, settyping] = useState();
  // const { chatdata } = useFetchChats();
  const [chats, setchats] = useState();
  const imageUrl = image ? URL.createObjectURL(image) : "";
  const [searchParams] = useSearchParams();
  const { uuid } = useParams();
  const chatId = searchParams.get("chatId");
  const { user } = useUser();
  const [Searchmessage, setSearchmessage] = useState("");
  const [foundChats, setfoundChats] = useState();
  const [serverUrl, setserverUrl] = useState(null);
  // const {users} = useContext(LoggedContext)

  const { data, isLoading } = useQuery({
    queryFn: () => searchuseruuid(uuid),
    queryKey: ["openedchat", uuid],
  });
  const { uuid: openeduuid } = data ? data[0] : "";

  const ref = useRef(null);
  // const  scrolltobottom = ()=> {
  //   scrollref.current?.scrollIntoView({behavior:"smooth"})
  // }
  async function fetchchat() {
    const chat = await getchats(chatId);
    setchats(chat);
  }
  useEffect(
    function () {
      // ref.current = realtimesubscription();
      fetchchat();

    
    },
    [chatId]
  );
  const scrollref = useRef(null);
  // function scrollcallBack() {
  // }
  useEffect(
    function () {
      socket.on("message", ({ message, senderId,createdAt,ChatId }) => {
        // console.log(message)
         if( ChatId === chatId){
           setchats(chat=>[...chat,JSON.stringify({message,senderId,createdAt,ChatId})]);

         }  
      });
      socket.on("selfmessage",({message,senderId,createdAt})=>{
       
        setchats(chat=> [...chat,JSON.stringify({message,senderId,createdAt})])
      })
      socket.on("typing", ({fullName,Id}) => {
        chatId === Id ? settyping(`${fullName} is typing...`) :"";
        setTimeout(() => {
          settyping("");
        }, 2000);
      });
      socket.on("image", (imagedata) => {
        setserverUrl(`data:image/png;base64,${imagedata}`);
      });
      return () => {
        socket.off("image")
        socket.off("message").off()
      };
    
    },
    [socket,chatId]
  );

  useEffect(
    function () {
      if (scrollref.current) {
        scrollref.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    [chats]
  );

  const fullName = user?.user?.user_metadata?.fullName;
  if (text) {
    socket.emit("typing", { fullName, uuid ,chatId});
  }

  // function realtimesubscription() {
  //   const channel = supabase.channel("chat-messages");

  //   channel
  //     .on(
  //       "postgres_changes",
  //       {
  //         event: "*",
  //         schema: "public",
  //         table: "chats",
  //       },

  //       (payload) => {
  //         payload?.new?.chatId === chatId
  //           ? setchats(payload?.new?.messages)
  //           : "";
  //       }
  //     )
  //     .subscribe((status) => {
  //       if (status !== "subscribed") return;

  //       console.log("Connection Established");
  //     });

  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }

  function handlesendChat() {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;

        // if (!text || !image) return;
        if (image) {
          socket.emit("message", {
            to: uuid,
            senderId: user?.user?.id,
            file: {
              image: base64Image,
              fileName: image.name,
              mimeType: image.type,
            },
            chatId: chatId,
          });
        }
      };
      reader.readAsDataURL(image);
      setimage("");
    }

    // reader.readAsDataURL(image)
    if (text) {
      socket.emit("message", {
        to: uuid,
        senderId: user?.user?.id,
        message: text,
        chatId: chatId,
      });
    }
    settext("");
  }
  function convertDateTime(date) {
    const convertedDate = new Date(date).toString();
    const convertedTime = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
    return convertedTime;
  }
  const newList = new DoublyLinkedList();

  let finalChat = foundChats ? foundChats : chats;
  useEffect(
    function () {
      if (!Searchmessage) {
        setfoundChats("");
      }
    },
    [Searchmessage, setfoundChats]
  );
  function handleSearchMessage() {
    let foundChats = chats.filter((chat) =>
      JSON.parse(chat)?.message.toLowerCase().includes(Searchmessage)
    );
    setfoundChats(foundChats);

    // foundChats.map((chat)=> newList.insert(JSON.parse(chat)?.message))
    // console.log(foundChats)
    // console.log(newList.head.next.prev.next.message)
  }

  return (
    <div className="md:col-span-2 cols-span-4 bg-white flex flex-col justify-between h-[98vh] relative">
      <ChatHeader
        openeduuid={openeduuid}
        setSearchmessage={setSearchmessage}
        handleSearchMessage={handleSearchMessage}
        chatId={chatId}
        chats={chats}
      />

      <div className="flex flex-col   gap-2  h-full overflow-y-scroll p-5">
        {finalChat?.map((chat) =>
          JSON.parse(chat)?.senderId !== user?.user?.id   ? (
            <div
              className="message_user text-white  p-2 rounded-md flex justify-start max-w-fit "
              key={JSON.parse(chat)?.createdAt}
            >
              <div className="flex flex-col gap-2 mx-10 w-1/2">
                {JSON.parse(chat)?.message.startsWith("https") ? (
                  <span className="  relative max-w-fit">
                    <button className="  text-stone-800 absolute  top-0 left-0  z-20 bg-gray-200">
                      <MdOutlineDownload className="w-8 h-8 p-1" />
                    </button>
                    <img
                      src={JSON.parse(chat)?.message}
                      className="w-1/2 relative"
                    />
                  </span>
                ) : (
                  <h1 className="bg-blue-500 p-2 rounded-md text-xs max-w-fit overflow-x-auto">
                    {JSON.parse(chat)?.message}
                  </h1>
                )}

                <span className="text-xs text-gray-400">
                  {convertDateTime(JSON.parse(chat)?.createdAt)}
                </span>
                <img
                  src={serverUrl}
                  className="rounded-md w-1/3 shadow-lg"
                  alt={serverUrl}
                />
              </div>
            </div>
          ) : (
            <div
              className="message_own    flex  justify-end "
              key={JSON.parse(chat)?.createdAt}
              ref={scrollref}
            >
              <div className="flex flex-col mx-10 gap-4 w-1/2 items-end ">
                {JSON.parse(chat)?.message.startsWith("https") ? (
                  <img
                    src={JSON.parse(chat)?.message}
                    alt="image"
                    className="w-1/2"
                  />
                ) : (
                  <h1 className=" bg-slate-900 text-white rounded-md p-2 w-1/2 max-w-fit text-xs flex  gap-1 group overflow-y-auto">
                    {JSON.parse(chat)?.message}
                  </h1>
                )}
                <span className="text-xs text-gra">
                  {convertDateTime(JSON.parse(chat)?.createdAt)}
                </span>
                {/* <span>{typing ? typing :""}</span> */}
              </div>
            </div>
          )
        )}
        {typing && (
          <span className="text-gray-900  text-xs mx-10">{typing}</span>
        )}
        <div ref={scrollref} className="hidden">
          hello
        </div>
        {image && (
          <div className="message_own  absolute bottom-1 right-5 left-0 flex gap-2 justify-end ">
            <div className="flex flex-col m-5 gap-4  items-end absolute bottom-16 w-1/4  bg-stone-50 p-3 rounded-md shadow-lg border border-gray-300">
              {/* <h1 className=" bg-slate-900 text-white rounded-md p-2 max-w-fit">hello</h1> */}
              <button onClick={() => setimage("")}>
                <CgCloseO className="w-6 h-6 text-red-500" />
              </button>
              {image && (
                <img
                  src={imageUrl}
                  className="rounded-md  shadow-lg border border-gray-200"
                  alt={image?.name}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <ChatFooter
        setimage={setimage}
        settext={settext}
        handlesendChat={handlesendChat}
        text={text}
      />
    </div>
  );
}

export default Chat;
