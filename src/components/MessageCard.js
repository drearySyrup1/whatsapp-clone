import React from "react";
import { BsCheckAll as CheckIcon } from "react-icons/bs";

function determineLength(msg) {
  const len = msg.length;

  if (len <= 13) {
    return "w-1/4";
  } else if (len <= 27) {
    return "w-1/3";
  } else if (len <= 74) {
    return "w-max";
  } else {
    return "w-10/12";
  }
}

const MessageCard = ({ right, message }) => {
  const alignment = right ? "ml-auto" : "";
  const color = right ? "bg-emerald-800" : "bg-zinc-700";
  const size = determineLength(message);
  return (
    <div
      className={`grid shadow-md ${alignment} ${size} rounded-md ${color} p-3`}
    >
      <p>{message}</p>
      <div className="flex items-center gap-1 justify-self-end">
        <span className=" text-xs text-white text-opacity-50">9:22 PM</span>
        <CheckIcon className="h-4 w-4" />
      </div>
    </div>
  );
};

export default MessageCard;
