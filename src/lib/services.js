import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../Login/useUser";
import { supabase } from "./supabase";
import { socket } from "../ui/AppLayout";




export async function Login({ email, password }) {
 
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error("Invalid Email Address or Password");
  socket.emit("login",data?.user)
  return data;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  return data;
}

export async function createUser({
  fullName,
  email,
  password,
  username,
  image,
}) {
  const imageName = `avatar-${username}-${Math.random()}`;
  const imageUrl = `https://zsrtvoeoonhhtdghhnhw.supabase.co/storage/v1/object/public/avatars/${imageName}`;

  // if(!image) return;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, image);

  if (storageError) throw new Error("Avatar not uploaded sucessfully");

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { fullName: fullName, avatar: imageUrl } },
  });

  if (data) {
    const { data: userdata } = await supabase.from("users").insert({
      username: username,
      fullName: fullName,
      email: email,
      uuid: data?.user?.id,
      avatar: imageUrl,
    });
    const { data: message } = await supabase
      .from("userchats")
      .insert({ uuid: data?.user?.id, chats: [] });
  }

  return data;
}

export async function searchUser(username) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username);
  

  if (error) throw new Error("Username not found");
  return data;
}

export async function createChat(newChat) {
  const { content, senderId, receiverId,senderfullName,senderavatar,receiverfullName,receiveravatar } = newChat;

  const { data, error } = await supabase
    .from("chats")
    .insert({ messages: content })
    .select();

  if (error) throw new Error("User not added to Chat");
  const { data: senderData } = await supabase
    .from("userchats")
    .select("chats")
    .eq("uuid", senderId);
  const { data: receiverData } = await supabase
    .from("userchats")
    .select("chats")
    .eq("uuid", receiverId);
  const senderobject = senderData[0]?.chats;
  const senderChat = [
    ...senderobject,
    {
      chatId: data[0]?.chatId,
      updatedat: Date(),
      lastmessage: "",
      receiverId: receiverId,
      fullName:receiverfullName,
      avatar:receiveravatar,
    },
  ];

  const receiverobject = receiverData[0]?.chats;
  const receiverChat = [
    ...receiverobject,
    {
      chatId: data[0]?.chatId,
      updatedat: Date(),
      lastmessage: "",
      receiverId: senderId,
      fullName:senderfullName,
      avatar:senderavatar,
    },
  ];

  if (data) {
    const { data: userdata, error } = await supabase
      .from("userchats")
      .update({
        chats: senderChat,
      })
      .eq("uuid", senderId);
    if (error) console.log(error.message);
    const { data: receiverdata } = await supabase
      .from("userchats")
      .update({
        chats: receiverChat,
      })
      .eq("uuid", receiverId);
  }

  return data;
}

export async function getRecentChat() {
  const user = await getUser();
  const uuid = user?.user?.id;
  const { data, error } = await supabase
    .from("userchats")
    .select("chats")
    .eq("uuid", uuid);
 
  if (error) throw new Error(error.message);
  return data[0]?.chats;
}

export async function searchuseruuid(uuid) {
  if(!uuid) return;
  const {data,error} = await supabase.from("userchats").select("*,uuid(fullName,avatar,created_at)").eq("uuid",uuid)
  if(error) throw new Error("Data not found")
  return data
}

export async function getchats(chatId) {
  
  const {data,error} = await supabase.from("chats").select("messages").eq("chatId",chatId)
  if(error) throw new Error(error.message)

    return data[0]?.messages
}


export async function sendChat({chat,chatId,uuid}) {
  const {data:readchat} = await supabase.from("chats").select("messages").eq("chatId",chatId)
  const readdata = readchat[0].messages
  const newChat =  [...readdata,chat]
  // console.log(newChat)
  const {data,error} = await supabase.from("chats").update({messages:newChat}).eq("chatId",chatId).select()
// if(data){
//   const {data:userdata,error} = await supabase.from("userchats").select("chats").eq("chatId",chatId).filter("chatId",chatId)
//   // const {data:userchats,error} = await supabase.from("userchats").update({chats:[{lastmessage:chat?.message,chatId:chatId}]}).eq("chats->chatId",chatId)
//   // if(error) console.log(error.message)
//   console.log(userdata)
// }
  if(error) throw new Error(error.message)
 
   return data[0]?.messages
}

export async function deleteChat({chatId,uuid}) {
  console.log(uuid)
  const message = "";
  const {data,error} = await supabase.from("chats").update({messages:[]}).eq("chatId",chatId)
  if(error) throw new Error(error.message);
  const {data:recentchat,error:chaterror} = await supabase.rpc("update_chats",{user_id:uuid,object_id:chatId,lastmessage:{message}});
}
 

export async function signOut() {
  const {data,error} = await supabase.auth.signOut()

}
export async function updatePassword(newpassword) {
  const {data,error} = await supabase.auth.updateUser({password:newpassword})

  if(error) throw new Error("Password not updated for user")

}
