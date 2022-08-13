import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ room, socket, username }) {
  const [roomUsers, setRoomUsers] = useState([]);
  const navigate = useNavigate();

  // get list of users in chat room
  useEffect(() => {
    socket.on("chatroom_users", (users) => {
      setRoomUsers(users);
    });
  }, [socket, roomUsers]);

  const leaveRoom = () => {
    const __createdtime__ = Date.now();
    socket.emit("leave_room", { username, room, __createdtime__ });
    navigate("/", { replace: true });
  };

  return (
    <div className="basis-2/5 flex flex-col items-center text-center font-josefin">
      <h1 className="p-4 w-full border-b-2 bg-white">
        {sessionStorage.getItem("room")}
      </h1>
      <h2 className="p-2 w-full border-b-2">Users:</h2>
      <ul className="border-b-2 w-full">
        {roomUsers.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <div className="w-full p-3">
        <button
          onClick={leaveRoom}
          className="w-4/5 border-2 p-2 bg-secondary shadow-mainShadow"
        >
          Leave
        </button>
      </div>
    </div>
  );
}
