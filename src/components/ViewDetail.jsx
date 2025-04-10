import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { BsChatDots, BsEye } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { searchuseruuid } from "../lib/services";
import { CgCloseO } from "react-icons/cg";
import { IoImageSharp } from "react-icons/io5";
import { BiText } from "react-icons/bi";

function ViewDetail() {
  const [searchParams, setsearchParams] = useSearchParams();
  const view = searchParams.get("view");
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useQuery({
    queryFn: () => searchuseruuid(uuid),
    queryKey: ["viewuser", uuid],
  });
  const { uuid: fetcheduuid } = data ? data[0] : "";
  function handleclosedetail() {
    // navigate(-1)
    searchParams.delete("view");
    setsearchParams(searchParams);
  }
  function convertDateTime(date) {
    const convertedDate = new Date(date).toDateString();
    return convertedDate;
  }
  return (
    <div className="bg-purple-50 border-l border-l-gray-200 rounded-e-md md:relative md:h-full absolute top-3 h-1/2 md:bottom-0 md:top-0 md:right-0 w-4/5 right-2 md:w-full">
      <div className="flex flex-col justify-center items-center bg-slate-700 "></div>

      {view && (
        <div className="flex flex-col justify-center items-center mt-10 gap-4 bg-purple-50 border border-gray-300 m-3 rounded-md relative">
          <img
            src={fetcheduuid?.avatar}
            alt={`${fetcheduuid?.fullName}-avatar`}
            className="rounded-full w-1/3 mt-5"
          />
          <h1 className="font-bold">{fetcheduuid?.fullName}</h1>
          <h1 className="text-center text-sm my-3 font-semibold">
            Joined on{" "}
            <span className="text-red-500">
              {convertDateTime(fetcheduuid?.created_at)}
            </span>
          </h1>
          <div className="bg-purple-50  flex flex-col mx-5 border border-gray-400  w-2/3 my-2    p-2 text-xs rounded-md">
            {/* <div className="flex flex-col gap-2">
              <li className="mx-2 flex  items-center gap-2 border-b-gray-200 border-b p-1 bg-purple-100 rounded-t-md">
                <BsChatDots />
               Total Chats <span>0</span>
              </li>
              <li className="flex items-center gap-2 mx-2 p-1 border-b-gray-200 border-b bg-purple-100 rounded-t-md">
                <IoImageSharp/>
               Images <span>0</span>
              </li>
              <li className="flex items-center gap-2 p-1 border-b-gray-200 border-b mx-2">
               <BiText/>
               Text Messages 
               <span>0</span>
              </li>
            </div> */}
          </div>
          <button
            className="absolute top-3 right-4  rounded-full hover:bg-black duration-150 group hover:text-white"
            onClick={() => handleclosedetail()}
          >
            <CgCloseO className="w-6 h-6 " />
          </button>
        </div>
      )}
    </div>
  );
}

export default ViewDetail;
