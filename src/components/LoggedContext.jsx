import { createContext, useEffect, useState } from "react";
import { socket } from "../ui/AppLayout";

export const LoggedContext = createContext()

export function LoggedUser({children}){
    const [users,setUser] = useState()
    
   
   
    return <LoggedContext.Provider value={{users,setUser}}>
          {children}
    </LoggedContext.Provider>
}