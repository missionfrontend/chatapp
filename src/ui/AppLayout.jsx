import { BsEye, BsPauseBtn, BsPlayBtn } from "react-icons/bs";
import ChatFooter from "../components/ChatFooter";
import ChatHeader from "../components/ChatHeader";
import RecentChats from "../components/RecentChats";
import Search from "../components/Search";
import Login from "../Login/Login";
import { Modal } from "./Modal";
import AddChat from "./AddChat";
import { useUser } from "../Login/useUser";
import { FaSignOutAlt } from "react-icons/fa";
import ChatLayout from "./ChatLayout";
import { useContext, useEffect, useRef, useState } from "react";
import { BiLeftArrowCircle, BiPause } from "react-icons/bi";
import { io } from "socket.io-client";
import { LoggedContext } from "../components/LoggedContext";
import { useParams, useSearchParams } from "react-router";
import { searchuseruuid } from "../lib/services";
import { useQuery } from "@tanstack/react-query";
import { CgClose, CgCloseO } from "react-icons/cg";
import { useSignOut } from "./useSignOut";
import ViewDetail from "../components/ViewDetail";
import AccountUpdate from "../components/AccountUpdate";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdAccountCircle } from "react-icons/md";
import { GoSignOut } from "react-icons/go";

export const socket = io(import.meta.env.VITE_SERVER, {
  path: "/socket.io",
  reconnection: false,
});
function AppLayout() {
  const [searchParams, setsearchParams] = useSearchParams();
  const [fetcheddata, setfetcheddata] = useState();
  const { uuid } = useParams();
  const view = searchParams.get("view");
  const account = searchParams.get("account");
  const { setUser } = useContext(LoggedContext);
  const { user } = useUser();
  const { fullName, avatar } = user?.user?.user_metadata;
  const { SignOut } = useSignOut();
  const [show, setshow] = useState(false);

  useEffect(
    function () {
      console.log(socket);
      socket.emit("login", user);
      socket.on("authenticated", (users) => {
        // console.log(socket.connected)
      });

      return () => {
        socket.off("authenticated");
      };
    },
    [socket]
  );

  function handleSignOut() {
    SignOut();
  }
  function handleviewAccount() {
    searchParams.set("account", true);
    setsearchParams(searchParams);
  }
  return (
    <div className="bg-purple-100 h-[99vh] m-1 grid grid-cols-5 md:grid-cols-4 min-h-screen font-poppins p-2 rounded-md">
      <div className=" bg-purple-50 p-4  flex-col gap-4 rounded-s-md border-r border-r-gray-300 hidden md:flex">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-stone-800 ">Chats</h1>
          <div className="flex items-center gap-3">
            <h2 className="text-xs font-semibold">{fullName}</h2>
            <img
              src={avatar}
              className="w-9 h-9 ring-1 ring-gray-300 rounded-full"
            />
            <button
              className="bg-white p-1 rounded-md hover:shadow-2xl"
              onClick={() => handleSignOut()}
            >
              <FaSignOutAlt className="w-6 h-6 fill-purple-900" />
            </button>
          </div>
        </div>

        <div>
          <Search />
          <div className="flex justify-between item-center text-sm  mt-5 p-2">
            <h2 className="text-sm">Recent</h2>
            <Modal>
              <Modal.Button name="addchat">
                <button className="bg-purple-500 text-white p-1 rounded-sm text-xs font-semibold hover:bg-purple-800">
                  New Chat
                </button>
              </Modal.Button>
              <Modal.Window name="addchat">
                <AddChat />
              </Modal.Window>
            </Modal>
          </div>
          <RecentChats />
        </div>
      </div>

      {/* <div className="w-1/6 absolute top-1 left-1 bottom-1 bg-purple-100 flex flex-col items-center p-4 rounded-s-lg">
        </div> */}
      <div className="md:hidden">
        <div
          className={`md:hidden flex flex-col  items-center bg-purple-50 text-xs border-r  border-r-gray-300  ${
            show
              ? "w-[40%] absolute z-50 top-3 left-2 bottom-1 "
              : "w-[20%] z-50 absolute top-3 left-2 bottom-0"
          }   transition-all duration-500`}
        >
          <button className="p-4" onClick={() => setshow((close) => !close)}>
            {show ? (
              <BiLeftArrowCircle className="w-8 h-8 hover:fill-white hover:bg-stone-800 rounded-full duration-500" />
            ) : (
              <RxHamburgerMenu className="w-8 h-8 hover:text-stone-500  rounded-full duration-500" />
            )}
          </button>
          <img
            src={avatar}
            className={`${
              show ? "w-16 h-16" : "w-12 h-12"
            } duration-500 transition-all mt-10 rounded-full border border-gray-200`}
          />
          <h1 className="font-semibold my-3">{fullName}</h1>
          
          <div className="flex justify-center items-center">
          <Modal>
            <Modal.Button name="addchat">
              <button className=" text-white hover:shadow-lg hover:scale-105 text-xs p-1 hover: rounded-sm bg-gradient-to-br from-purple-500 to-purple-800 font-semibold">
                New Chat
              </button>
            </Modal.Button>
            <Modal.Window name="addchat">
              <AddChat />
            </Modal.Window>
          </Modal>
          </div>

          <RecentChats show={show} />
          <div className="flex flex-col justify-end h-full w-full font-bold text-md mb-2">
            <button
              className="flex gap-2   items-center p-2 justify-center  hover:bg-stone-200"
              onClick={() => handleviewAccount()}
            >
              Account
              <MdAccountCircle />
            </button>
            <button
              className=" p-2  flex items-center gap-2 justify-center hover:bg-stone-200"
              onClick={() => handleSignOut()}
            >
              SignOut <GoSignOut />
            </button>
          </div>
        </div>
      </div>

      <ChatLayout />

      {!view && !account && (
        <div className=" justify-center items-center h-full hidden md:flex">
          <h1 className="text-sm  flex items-center gap-5">
            <BsEye />
            No details to Preview
          </h1>
        </div>
      )}
      {account && <AccountUpdate />}
      {view && <ViewDetail />}
    </div>
  );
}

export default AppLayout;
