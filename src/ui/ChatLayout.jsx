import { Outlet } from "react-router";

function ChatLayout(){
  return <div className="col-span-4  md:col-span-2 bg-white h-full">
         
            <Outlet/>
         
  </div>
}

export default ChatLayout;