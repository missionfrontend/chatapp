import { BiChat } from "react-icons/bi";

function NoChat(){
    return  <div className="h-full flex justify-center items-center  text-slate-900">
            <h1 className="font-semibold flex items-center gap-4">Select User or Start new Chat<BiChat className="w-8 h-8"/></h1>
    </div>
}

export default NoChat;