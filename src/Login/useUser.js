import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/services";

export function useUser(){
    const {data:user,isLoading}= useQuery({
        queryKey:["user"],
        queryFn:getUser
    })

    return {isAuthenticated :user?.user?.role === "authenticated",user,isLoading}
}