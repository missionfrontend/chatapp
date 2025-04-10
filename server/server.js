import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { supabase, supabaseUrl } from "../lib/supabase.js";
import fs from "fs"
import path from "path"
import { useQueryClient } from "@tanstack/react-query";

const app = express();

const http = createServer(app);
// const fs = new fs()
const io = new Server(http, {
  path: "/socket.io",
  cors: {
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST"],
    allowedHeaders: ["content-type"],
    
  },
  maxHttpBufferSize:1e8
});
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
// app.use(cors());

http.listen(8000, () => {
  console.log("server is running");
});

const loggeduser = {};

io.on("connection", (socket) => {
  socket.on("login", (user) => {
    const userId = user?.user?.id;
    loggeduser[userId] = socket.id;

    socket.emit("authenticated", loggeduser);
    let status = socket.connected
     

       if(loggeduser[userId]){
         
         
         socket.broadcast.emit("online",{status,userId});
         
         
        }
     
      // console.log(loggeduser[userId] === socket.id)
    
    
    //    console.log(user)
  });
  socket.on("message", async ({ to, message,senderId, chatId ,file}) => {
    const receiverId = loggeduser[to];
    const recepientId = loggeduser[receiverId]
    
    const {image,fileName,mimeType} = file ?  file :""
    // socket.to(receiverId).emit("image",message.toString("base64"))
    if(!receiverId){
      const imageUrl = `${supabaseUrl}/storage/v1/object/public/avatars/images/${fileName}`
      if(fileName){
        
        const base64Data = image.replace(/^data:image\/\w+;base64,/,"")
        const buffer = Buffer.from(base64Data,"base64")
        const {data:storageData,error:storageError} = await supabase.storage.from("avatars").upload(`images/${fileName}`,buffer,{contentType:mimeType})
        const { data, error } = await supabase
        .rpc("array_append", {
          table_name: "chats",
          column_name: "messages",
          row_id: chatId,
          object_to_insert: JSON.stringify({
            senderId: senderId,
            message: imageUrl,
            createdAt: Date.now()
          }),
        })    
        
        const {data:chatdata,error:chaterror}= await supabase.rpc("update_chats",{user_id:to,object_id:chatId,lastmessage:{mimeType}})
        if(chaterror) throw new Error(chaterror.message)
          socket.emit("selfmessage",{message:imageUrl,senderId,createdAt:Date.now()})
      }else{

        const { data, error } = await supabase
        .rpc("array_append", {
          table_name: "chats",
          column_name: "messages",
          row_id: chatId,
          object_to_insert: JSON.stringify({
            senderId: senderId,
            message: message,
            createdAt: Date.now()
          }),
        })
        
        const {data:chatdata,error:chaterror}= await supabase.rpc("update_chats",{user_id:to,object_id:chatId,lastmessage:{message}})
        if(chaterror) throw new Error(chaterror.message)
        }
      socket.emit("selfmessage",{message,senderId,createdAt:Date.now()})
    }else{
      if(fileName){
        const imageUrl = `${supabaseUrl}/storage/v1/object/public/avatars/images/${fileName}`
    
        const base64Data = image.replace(/^data:image\/\w+;base64,/,"")
        const buffer = Buffer.from(base64Data,"base64")
        const {data:storageData,error:storageError} = await supabase.storage.from("avatars").upload(`images/${fileName}`,buffer,{contentType:mimeType})
        const { data, error } = await supabase
        .rpc("array_append", {
          table_name: "chats",
          column_name: "messages",
          row_id: chatId,
          object_to_insert: JSON.stringify({
            senderId: senderId,
            message: imageUrl,
            createdAt: Date.now()
          }),
        })    
         
        const {data:chatdata,error:chaterror}= await supabase.rpc("update_chats",{user_id:to,object_id:chatId,lastmessage:{mimeType}})
        if(chaterror) throw new Error(chaterror.message)
         socket.to(receiverId).emit("message",{message:imageUrl,senderId,createdAt:Date.now(),ChatId:chatId})
        socket.emit("selfmessage",{message:imageUrl,senderId,createdAt:Date.now()})
        }else{

          const { data, error } = await supabase
          .rpc("array_append", {
            table_name: "chats",
            column_name: "messages",
            row_id: chatId,
            object_to_insert: JSON.stringify({
              senderId: senderId,
              message: message,
              createdAt: Date.now()
            }),
          })
          
          const {data:chatdata,error:chaterror}= await supabase.rpc("update_chats",{user_id:to,object_id:chatId,lastmessage:{message}})
          if(chaterror) throw new Error(chaterror.message)
            
            if(error) throw new Error(error.message)
              
              // socket.to(receiverId).emit("message", { message, senderId });
            socket.to(receiverId).emit("message",{message,senderId,createdAt:Date.now(),ChatId:chatId})
            socket.emit("selfmessage",{message,senderId,createdAt:Date.now(),chatId})
            socket.to(receiverId).emit("lastmessage",{message,chatId:chatId});
          }
  
  }
  });
  socket.on("typing",({fullName,uuid,chatId})=>{
   
    socket.to(loggeduser[uuid]).emit("typing",{fullName,Id:chatId})
  })
  // socket.on("online",(data)=>{

  //     socket.broadcast.emit("online",data)
  // })
});
