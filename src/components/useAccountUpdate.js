import { useMutation, useMutationState } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { updatePassword } from "../lib/services";

export function useAccountUpdate(){
    const [searchParams,setSearchParams] = useSearchParams()
    
    const {mutate :UpdatePassword,Loading,isSuccess} = useMutation({
        mutationFn:updatePassword,

        onSuccess:()=>{
            alert("Password Updated Successfully")
            searchParams.delete("account")
            setSearchParams(searchParams)
           
        }
    })

    return {UpdatePassword,Loading}
}
// function Notification
