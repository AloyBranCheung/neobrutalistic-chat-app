import React, { useState, useEffect, useRef } from "react";
import SendMessage from "./SendMessage";
import TextMessage from "./TextMessage";
import { v4 as uuidv4 } from "uuid";

export default function MessageContainer({ socket, username, room }) {
  const [messagesReceived, setMessagesReceived] = useState([
    {
      message: "Loading... server is free hosted so first load takes a while.",
      username: "Chat_Bot",
      __createdtime__: Date.now(),
    },
  ]);
  const msgColRef = useRef(null);

  const formatDateFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // receive last 100 messages when joining
  useEffect(() => {
    socket.on("last_100_messages", (last100Messages) => {
      setMessagesReceived(last100Messages);
    });

    return () => socket.off("last_100_messages");
  }, [socket]);

  // scroll to most recent message
  useEffect(() => {
    msgColRef.current.scrollTop = msgColRef.current.scrollHeight;
  }, [messagesReceived]);

  // run whenever socket event is received from server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className="flex flex-col basis-4/5 bg-secondary border-l-2 border-solid border-black font-josefin">
      <div
        ref={msgColRef}
        className="h-full flex flex-col items-center p-4 gap-4 overflow-scroll"
      >
        {messagesReceived.map((message) => {
          return (
            <TextMessage
              key={uuidv4()}
              message={message.message}
              username={message.username}
              timestamp={formatDateFromTimestamp(
                Number(message.__createdtime__)
              )}
            />
          );
        })}
      </div>
      <SendMessage socket={socket} username={username} room={room} />
    </div>
  );
}
