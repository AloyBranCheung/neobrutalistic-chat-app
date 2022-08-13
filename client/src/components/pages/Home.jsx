import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home({ username, setUsername, room, setRoom, socket }) {
  const navigate = useNavigate();

  // emit socket event "join_room" and send payload to server
  const joinHandler = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
    }

    navigate("/chat", { replace: true });
  };

  return (
    <div className="bg-background flex h-screen items-center justify-center p-8">
      <div className="flex h-min py-20 w-full sm:max-w-lg flex-col gap-3 justify-center items-center bg-secondary border-solid border-2 border-black shadow-mainShadow">
        <h1 className="text-xl">Chat with someone.</h1>
        <div className="flex flex-col gap-5 w-8/12 mt-4">
          <input
            className="p-3 border-solid border-2 border-black shadow-mainShadow outline-none"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <select
            onChange={(e) => {
              sessionStorage.setItem("room", e.target.value);
              setRoom(e.target.value);
            }}
            className="p-3 border-solid border-2 border-black shadow-mainShadow outline-none"
          >
            <option>Select a room</option>
            <option>React.js</option>
            <option>Node.js</option>
            <option>Express.js</option>
            <option>MongoDB</option>
          </select>
        </div>
        <div className="flex items-center justify-center mt-4  w-8/12">
          <button
            onClick={joinHandler}
            className="p-3 border-solid border-2 border-black shadow-mainShadow outline-none bg-white w-full"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
