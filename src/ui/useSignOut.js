import { useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../lib/services";
import { useNavigate } from "react-router";

export function useSignOut(){
    
    const navigate = useNavigate()
    const {mutate:SignOut,loading} = useMutation({
        mutationFn:signOut,

        onSuccess:()=>{
          navigate("/")
        }
    })

    return {SignOut}
}