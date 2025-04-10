import SignUpPage from "./SignUpPage";

function SignContainer({setCreateAccount}) {
  return (
    <div className=" p-4 relative h-full flex flex-col   gap-5">
      {/* <div className="flex flex-col gap-3 m-10">

      <div className="flex justify-between text-center gap-3">

      <p className=" p-2 rounded-full  text-xs bg-slate-900 text-yellow-400 px-4 w-1/2">
        Discover the benefits of signing up today! Join our community to
        access exclusive content, updates, and special offers tailored just for
        you.  
      </p>
      <p className=" p-2  text-xs  bg-slate-900 rounded-full text-purple-700 px-4 w-1/2">Sign up now to unlock a world of exclusive features and
        personalized content. Join our community and stay updated with the
        latest news and offers.</p>
      </div>
        <p className="text-gray-200 bg-slate-900 rounded-full px-4 shadow-inner">
        Join us by signing up today! Gain access to
        exclusive resources, updates, and special promotions designed to enhance
        your experience with us.
        </p>
      </div> */}
      <SignUpPage setCreateAccount ={setCreateAccount}/>
    </div>
  );
}

export default SignContainer;
