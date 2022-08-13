import React from "react";
import MessageContainer from "../MessageContainer";
import Sidebar from "../Sidebar";

export default function ChatPage({ room, socket, username }) {
  return (
    <div className="bg-background h-screen">
      <div className="flex w-full flex-row h-screen">
        <Sidebar socket={socket} username={username} room={room} />
        <MessageContainer socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}
