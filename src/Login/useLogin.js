import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Login } from "../lib/services";
import { useNavigate } from "react-router";

function useLogin() {
  const querClient = useQueryClient();
 const navigate = useNavigate()
  const { mutate: LoginUser, isLoading ,isError,error} = useMutation({
    mutationFn: Login,

    onSuccess: (user) => {
      querClient.setQueryData(["user"], user);
      navigate("/applayout")
    },
    // onError :(error)=>{throw new Error(error.message)}
  });

  return { LoginUser,isLoading,isError,error };
}

export default useLogin;