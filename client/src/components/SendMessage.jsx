import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function SendMessage({ socket, username, room }) {
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (message !== "" || message.length !== 0) {
      const __createdtime__ = Date.now();
      // send message to server for server to broadcast to everyone else
      socket.emit("send_message", { username, room, message, __createdtime__ });
    }
    setMessage("");
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div onKeyDown={handleKeydown} className="p-4 bg-white ">
      <div className="flex flex-row shadow-mainShadow">
        <input
          value={message}
          className="border-y-2 border-l-2 p-2 w-full basis-4/5 md:basis-11/12"
          type="text"
          placeholder="Send a message..."
          onChange={handleInputChange}
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center w-full border-2 basis-1/5 md:basis-1/12"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
}
