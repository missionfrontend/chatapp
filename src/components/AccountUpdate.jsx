import { useForm } from "react-hook-form";
import { CgClose, CgCloseO } from "react-icons/cg";
import { GrUpdate } from "react-icons/gr";
import { useNavigate, useSearchParams } from "react-router";
import { useAccountUpdate } from "./useAccountUpdate";

function AccountUpdate() {
  const [searchParams, setsearchParams] = useSearchParams();

  const { register, getValues, handleSubmit, formState} = useForm();
  const { errors} = formState;
  const {UpdatePassword,Loading} = useAccountUpdate()
  
  function handleCloseUpdate() {
    searchParams.delete("account");
    setsearchParams(searchParams);
  }
  
  
  function onSubmit(formData) {
    const {password,confirmpassword} = formData

    if(!password && !confirmpassword) return;
    UpdatePassword(confirmpassword)

    
  }
  return (
    <div className="flex flex-col gap-2 text-sm items-center  bg-purple-50 mx-5 my-2 p-3 rounded-md md:relative h-1/2 md:block absolute top-2 md:top-0 z-50 right-4 w-2/3 md:w-full">
      <h1 className="font-bold tracking-wider">Update Profile</h1>
      <form
        className="flex flex-col gap-2 mt-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="password">New Password</label>
        {errors?.password && <label className="text-red-500 font-mono text-xs font-bold">{errors?.password?.message}</label>}
        <input
          type="password"
          className="p-2 outline-none border-gray-200 border rounded-sm"
          id="password"
          name="password"
          {...register("password", {
            minLength:{
              value:8,
              message:"Password should be 8 character"
            }
          })}
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        {errors?.confirmpassword && <label className="text-red-500 font-mono font-bold text-xs">{errors?.confirmpassword?.message}</label>}
        <input
          type="password"
          className="p-2 outline-none border border-gray-200 rounded-sm"
          id="confirmpassword"
          name="confirmpassword"
          {...register("confirmpassword", {
          
            validate: (value) => value === getValues().password || "Password should match",
          })}
        />
        <button className="bg-purple-500 text-white p-2 rounded-md shadow-md mt-2 text-xs flex items-center gap-2 justify-center group hover:bg-purple-800">
          Update Profile <GrUpdate className={`${Loading && "animate-spin"}`} />
        </button>
      </form>
      <button
        className="absolute top-2 right-3 hover:bg-black hover:text-white rounded-full hover:shadow-lg hover:-translate-y-1 duration-500"
        onClick={() => handleCloseUpdate()}
      >
        <CgCloseO className="w-6 h-6 " />
      </button>
    </div>
  );
}

export default AccountUpdate;
