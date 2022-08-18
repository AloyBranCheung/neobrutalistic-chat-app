import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "./components/pages/ChatPage";

// client connects to server that is on port 3001
const socket = io.connect("https://neobrutalistic-chat-app.herokuapp.com/", {
  transports: ["websocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              username={username}
              setUsername={setUsername}
              room={room}
              setRoom={setRoom}
              socket={socket}
            />
          }
        />
        <Route
          path="/chat"
          element={<ChatPage username={username} room={room} socket={socket} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
