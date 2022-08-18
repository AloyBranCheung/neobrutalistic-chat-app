import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import mongoose from "mongoose";
import Message from "./model/Message.js";
import getMessages from "./services/getMessages.js";
import leaveRoom from "./services/leaveRoom.js";

const app = express();
const PORT = process.env.PORT || 3001;

// mongoose connect
const connectMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

// create http server to reuse to run socket.io within the same http server instance
// can be re-written with {const server = app.listen(port#); const io =
// require("socket.io").listen(server); io.sockets.on("connection",
// function(socket) {...});}

const server = http.createServer(app);

// variables for socket.io
const CHAT_BOT = "Chat_Bot";
let chatRoom = ""; // e.g. React.js
let allUsers = []; // all users in the current chat room

// Create an io server and allow for CORS from http://localhost:3000 with GET and POST methods
const io = new Server(server, {
  cors: {
    origin: "https://silly-narwhal-3281d0.netlify.app/",
    methods: ["GET", "POST"],
  },
});

// add cors middleware
app.use(cors());
// Listen for when the client connects via socket.io-client
io.on("connection", (socket) => {
  console.log(`User is connected ${socket.id}`);

  // listen for join_room event and connect user to room
  socket.on("join_room", (data) => {
    // data sent from client
    const { username, room } = data;
    // join the user to a socket room; room = client chosen room
    socket.join(room);

    // get first 100 messages
    getMessages(room)
      .then((messages) => {
        socket.emit("last_100_messages", messages);
        // welcome message to user that joined
        socket.emit("receive_message", {
          message: `Welcome ${username}`,
          username: CHAT_BOT,
          __createdtime__,
        });
      })
      .catch((err) => console.log(err));

    // current timestamp
    let __createdtime__ = Date.now();

    // send messages to all users currently in room (apart from user that joined)
    // event for client to receive is "receive_message" and payload is username (who sent it) and message (message content)
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room.`,
      username: CHAT_BOT,
      __createdtime__,
    });

    // save user to the room; sends an array of all chat room users to client via chatroom_users event
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((user) => {
      return user.room === room;
    });
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    // listen for send_message event
    socket.on("send_message", async (data) => {
      const { username, room, message, __createdtime__ } = data;
      //sends to all users in room including sender
      io.in(room).emit("receive_message", data);
      const newMessage = new Message(data);
      try {
        await newMessage.save();
      } catch (error) {
        console.log(error);
      }
    });

    // leave room
    socket.on("leave_room", (data) => {
      const { username, room } = data;
      socket.leave(room);
      const __createdtime__ = Date.now();
      // Remove user from serve memory
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(room).emit("chatroom_users", allUsers);
      socket.to(room).emit("receive_message", {
        username: CHAT_BOT,
        message: `${username} has left the chat.`,
        __createdtime__,
      });

      console.log(`${username} has left the chat.`);
    });

    socket.on("disconnect", () => {
      console.log(
        "User disconnected from chat. Time to upgrade your internet."
      );
      const user = allUsers.find((user) => user.id === socket.id);

      if (user?.username) {
        allUsers = leaveRoom(socket.id, allUsers);
        socket.to(chatRoom).emit("chatroom_users", allUsers);
        socket.to(chatRoom).emit("receive_message", {
          message: `${user.username} has disconnected from the chat. Time to upgrade their internet.`,
        });
      }
    });
  });
});

// request handler to check server is running
app.get("/", (req, res) => {
  res.send("Server is running...");
});

server.listen(PORT, () => {
  connectMongoose();
  console.log(`Server is listening on ${PORT}`);
});
