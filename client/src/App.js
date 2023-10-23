import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import { useState } from "react";
import { io } from "socket.io-client";
import ChatPage from "./components/pages/ChatPage";
import PrivateRoute from "./auth/ProtectedRoute";
import LoginPage from "./components/pages/LoginPage";

// client connects to server that is on port 3001
const socket = io.connect(process.env.REACT_APP_SERVER_URL, {
  transports: ["websocket"],
});

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
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
            path="chat"
            element={
              <ChatPage username={username} room={room} socket={socket} />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
