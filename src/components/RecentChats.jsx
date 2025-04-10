import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChatList from "./ChatList";
import { getRecentChat } from "../lib/services";
import { useEffect, useState } from "react";
import { socket } from "../ui/AppLayout";
import { useSearchParams } from "react-router";

const recentchats = [
  {
    name: "Jane Foster",
    lastmessage: "Hi",
    lastchat: "5 min",
    id: 1,
  },
  {
    name: "Chris Hamsworth",
    lastmessage: "when to arrive",
    lastchat: "6 min",
    id: 2,
  },
  {
    name: "Petert Hudson",
    lastmessage: "Coming tommorrow",
    lastchat: "1 day",
    id: 3,
  },
];

function RecentChats({show}) {
  const [lastmessage, setlastmessage] = useState();
  const [searchParams] = useSearchParams();
  const chat = searchParams.get("chatId");
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["recentchat"],
    queryFn: getRecentChat,
  });
  useEffect(
    function () {
      socket.on("lastmessage", ({ message, chatId }) => {
        
        setlastmessage({ message, chatId });
        queryClient.invalidateQueries({
          queryKey: ["recentchat"],
        });
        
        
      });

       return ()=>socket.off("lastmessage").off();
    },
    [socket,chat]
  );
  return (
    <div className="flex flex-col mt-8">
      <ul className="flex flex-col overflow-y-auto ">
        {data?.map((chats) => (
          <ChatList
            key={chats.chatId}
            chats={chats}
            recentmessage={lastmessage}
            setlastmessage ={setlastmessage}
            show={show}
          />
        ))}
      </ul>
    </div>
  );
}

export default RecentChats;
