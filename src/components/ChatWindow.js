import React, { useState } from "react";
import CameraIcon from "./icons/CameraIcon";
import UserAvatarIcon from "./icons/UserAvatarIcon";
import PhoneIcon from "./icons/PhoneIcon";
import SearchIcon from "./icons/SearchIcon";
import { MicrophoneIcon } from "@heroicons/react/24/outline";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import MessageCard from "./MessageCard";
import messagedata from "../messagedata";
import ProfileImg from "./ProfileImg";

const ChatWindow = () => {
  const [search, setSearch] = useState(false);
  const toggleSearch = () => setSearch((p) => !p);
  return (
    <div className="hidden md:grid md:grid-rows-[auto_1fr_auto]">
      {/* TOP-------------------------------------------------- */}
      <div className="flex items-center border-y border-zinc-900 p-4">
        {/* USER IMAGAE AND ANEM-------------------------------------------------- */}
        <div className="flex flex-grow items-center gap-4">
          <ProfileImg size={14} />

          <p className="text-lg font-bold">Username</p>
        </div>
        {/* TOOLBAR-------------------------------------------------- */}
        <div className="flex items-center gap-3">
          <CameraIcon className={"buttonhover"} />
          <PhoneIcon className={"buttonhover"} />
          <div className="h-[25px] w-[1px] bg-zinc-500"></div>
          <div className="flex">
            <input
              className={`bg-transparent 
            focus:outline-none
            w-0
            transition-[width]
            ${search && "w-[150px] lg:w-[300px]"}
            `}
              placeholder="Type something..."
              type="text"
            />
            <SearchIcon onClick={toggleSearch} className="buttonhover" />
          </div>
        </div>
      </div>
      {/* Messages-------------------------------------------------- */}
      <div className="bgcustom1 space-y-2 p-4">
        {/* Message card */}

        <div className="!my-4 mx-auto w-min rounded-md bg-zinc-900 p-3 text-white text-opacity-50">
          26/04/2021
        </div>
        {messagedata.map((item, i) => {
          if (i % 2 === 0) {
            return <MessageCard message={item.msg} right />;
          } else {
            return <MessageCard message={item.msg} left />;
          }
        })}
      </div>
      {/* BOTTOM-------------------------------------------------- */}
      <div className="flex gap-3 border-t-2 border-zinc-900 p-4">
        <FaceSmileIcon className="buttonhover h-10 w-10" />
        <PaperClipIcon className="buttonhover h-10 w-10 -scale-x-100 -scale-y-100" />
        <input
          placeholder="Type message..."
          className="flex-grow bg-transparent focus:outline-none"
          type="text"
        />
        <MicrophoneIcon className="buttonhover h-10 w-10" />
      </div>
    </div>
  );
};

export default ChatWindow;
