import { useMutation } from "@tanstack/react-query";
import { createUser } from "../lib/services";

export function useSignUp(){
   const {mutate:signUp,isLoading} = useMutation({
    mutationFn:createUser

   })

   return {signUp,isLoading}
}