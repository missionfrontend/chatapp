import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"
import { getchats } from "../lib/services"
import { useEffect, useState } from "react"

export function useFetchChats(){
    const [searchParams] = useSearchParams()
    const chatId = searchParams.get("chatId")
    
    const {data:chatdata,isLoading} = useQuery({
        queryFn:()=>getchats(chatId),
        queryKey:["chatuser",chatId],
        
      })
 
      return {chatdata,isLoading}
}