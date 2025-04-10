import LoginPage from "./LoginPage";

function LoginContainer({setCreateAccount}) {
  return (
    <div className="flex flex-col  p-4 gap-4 justify-center  h-full relative">
      <div className="text-center flex flex-col gap-3 mx-10">
        <h1 className="md:text-3xl  text-xl text-center font-bold text-stone-800 my-4">Welcome to ChatSpot</h1>
        <p className="text-center   text-green-800 my-5 font-light text-sm">
          "Connect seamlessly with friends and family through instant messaging,
          sharing photos and videos, making voice and video calls - all in one
          sleek, user-friendly chat app designed for effortless communication on
          the go"
        </p>
      </div>
      {/* <div className="absolute h-10 w-1/5 rounded-e-full bg-yellow-300 left-0 bottom-4 shadow-lg text-xs flex items-center p-2 font-semibold">Real-time communication</div> */}
      {/* <div className="absolute h-10 w-1/5 rounded-s-full bg-yellow-300 right-0 bottom-4 shadow-lg text-xs flex items-center p-2 font-semibold">For a privacy-focused app</div> */}
      {/* <div className="absolute h-10 w-1/5 rounded-e-full bg-yellow-300 left-0 top-24 shadow-lg text-xs flex items-center p-4 font-semibold">User-friendly interface</div> */}
      {/* <div className="absolute h-10 w-1/5 rounded-s-full bg-yellow-300 -right-0 top-24 shadow-lg text-xs flex items-center p-2 font-semibold">Cross-platform compatibility</div> */}
      <LoginPage setCreateAccount = {setCreateAccount}/>
    </div>
  );
}

export default LoginContainer;
