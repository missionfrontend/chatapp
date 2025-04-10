import { useState } from "react";
import LoginContainer from "./LoginContainer";

import SignContainer from "./SignContainer";


function Login() {

  const [createAccount,setCreateAccount] = useState(false)
  return (
    <div className=" border  bg-gradient-to-br from-purple-500 to-purple-800 font-poppins  shadow-lg rounded-lg min-h-svh ">
      <div className=" bg-white bg-gradient-to-br from-stone-200 to-slate-200 flex flex-col lg:flex-row  border-gray-300 p-2 rounded-lg m-2  h-[97vh] ">
        <div className="  flex  border  border-purple-200 lg:w-[60%] lg:rounded-s-lg m-1 lg:border-e-transparent w-full md:h-auto h-full ">
          
          {!createAccount ? <LoginContainer setCreateAccount ={setCreateAccount}/> :<SignContainer setCreateAccount ={setCreateAccount}/>}
        </div>
        <div className="   rounded-e-lg w-full m-1 border border-gray-200 p-2 hidden lg:block">
          <img src="chatbg.jpg" className=" h-full w-full rounded-e-lg "/>
        
        </div>
      </div>
    </div>
  );
}

export default Login;
