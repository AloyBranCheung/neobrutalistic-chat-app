import React from "react";

export default function TextMessage({ reply, message, username, timestamp }) {
  return (
    <div className="w-full bg-background border-2 shadow-mainShadow">
      <div className="flex flex-row justify-between p-1 border-b-2 text-xs">
        <p>{username}</p>
        <p>{timestamp}</p>
      </div>
      <div className={`p-1 ${reply && "text-right"}`}>
        <p>{message}</p>
      </div>
    </div>
  );
}
