import { FaSignOutAlt } from "react-icons/fa";
import { useSignUp } from "./useSignUp";
import { useForm } from "react-hook-form";
import { RxAvatar } from "react-icons/rx";
import { useEffect, useState } from "react";
import { IoImage } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";

function SignUpPage({setCreateAccount}){
  const [image,setimage] = useState()
   const {signUp,isLoading} = useSignUp()
   const imageUrl =  image ? URL.createObjectURL(image) :<MdAccountCircle/>
   const {register,handleSubmit,getValues} = useForm() 
    
  //  useEffect(function(){
  //     const image = getValues()?.avatar[0]?.name
  //     console.log(image)
  //     setimage(image)
  //  },[getValues])

   function onSubmit(data){
    const {email,password,fullName,username} = data
     if(!data || !image)  return;
    //  console.log(image)
     signUp({email,password,fullName,username,image})
   }
    return  <div className="p-4 flex flex-col gap-4 my-10 md:m-10  font-semibold text-stone-800 h-full rounded-e-full w-full">
    <div className="flex justify-between gap-5 md:gap-0">

    <h1 className="text-2xl">Create new Account</h1>
    <button className="text-blue-500 underline text-xs" onClick={()=> setCreateAccount(false)}>Sign In</button>
    </div>
    
    
    <form className="flex flex-col gap-3 mt-5 text-xs md:text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <label>Enter Full Name</label>
        <input type="text" className="p-2 rounded-e-full" name="fullName" required {...register("fullName",{required:"This Field is Required"})}/>

      </div>
      <div className="flex flex-col gap-4">
        <label>Username</label>
        <input type="text" className="p-2 rounded-e-full text-slate-950" name="username" required {...register("username",{required:"This Field is Required"})}/>
      </div>
      <div className="flex flex-col gap-4">
        <label>Enter Email Address</label>
        <input type="email" className="p-2 rounded-e-full text-slate-950" required  name="name" {...register("email",{required:"This Field is required"})}/>
      </div>

      <div className="flex flex-col gap-4">
        <label>Enter Password</label>
        <input type="password" className="p-2 rounded-e-full text-slate-950" required name="password" {...register("password",{minLength:9})}/>
      </div>
      <div className="flex gap-5 items-center">
       <img src={imageUrl}  className="ring-1 ring-gray-300 w-10 h-10 rounded-full"/>
       <label htmlFor="avatar" className="underline">Upload Image</label>
       <input type="file" className="hidden" id="avatar" name="avatar" {...register("avatar")} accept="image/*" onChange={(e)=> setimage(e.target.files[0])}/>
      </div>
      <button className="bg-purple-500 p-2 rounded-md flex justify-center items-center gap-3 mt-5"><FaSignOutAlt/>Create Account</button>
    </form>
   </div>
}

export default SignUpPage;
