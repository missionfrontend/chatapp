import { useMutation } from "@tanstack/react-query";
import { FaSignInAlt } from "react-icons/fa";
import { Login } from "../lib/services";
import { useEffect, useState } from "react";
import useLogin from "./useLogin";
import { socket } from "../ui/AppLayout";

function LoginPage({setCreateAccount}) {
  const [email,setemail] = useState()
  const [password,setpassword] = useState()
  const {LoginUser,isError,error} = useLogin()
    // const {mutate:LoginUser,isLoading} = useMutation({
    //     mutationFn:Login

    // })
   
    function handleLogin(e){
       e.preventDefault()
       
       LoginUser({email,password})
    }
  return (
    <div className=" font-semibold flex flex-col gap-4">
      <h1 className="md:text-2xl text-lg text-center text-slate-900 font-bold">Login to your Account</h1>
      <form className="flex flex-col gap-5 justify-between mt-5  rounded-md p-4 text-xs md:text-sm mx-10 tracking-wider" onSubmit={(e)=>handleLogin(e)}>
        {isError && <label className="text-red-500  font-bold text-center">{error?.message}</label>}
        <label className="text-stone-800">Email Address</label>
        <input type="email" className="p-2  border border-purple-900 outline-none rounded-md " name="email" id="email"  onChange={(e)=> setemail(e.target.value)}/>
        <label className="text-stone-800">Password</label>
        <input type="password" className="p-2  border border-purple-900 outline-none rounded-md " name="password" id="password"  onChange={(e)=> setpassword(e.target.value)}/>
        <button className="bg-purple-400 p-2 rounded-md mt-5 font-semibold text-purple-950 flex justify-center items-center gap-3"><FaSignInAlt/>Login</button>
      </form>
      <div className="flex flex-col gap-1 items-start mx-16 text-xs">

      <h1>Need Account to Login ?</h1>
      <button className="text-blue-500 underline" onClick={()=> setCreateAccount(true)}>Create An Account</button>
      </div>
    </div>
  );
}

export default LoginPage;
