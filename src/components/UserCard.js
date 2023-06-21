import React from "react";
import UserAvatarIcon from "./icons/UserAvatarIcon";
import { BsCheckAll as CheckIcon } from "react-icons/bs";
import ImageIcon from "./icons/ImageIcon";
import ProfileImg from "./ProfileImg";

const UserCard = () => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] gap-3 rounded-md p-3 text-sm text-zinc-400 hover:bg-zinc-700 active:bg-zinc-600">
      {/* IMG */}
      <ProfileImg size={14} />
      {/* Mid */}
      <div>
        <p className="font-bold text-white">User</p>
        <div className="flex items-center gap-1">
          <CheckIcon className="h-4 w-4" />
          <ImageIcon className="h-4 w-4" />
          <span>Image</span>
        </div>
      </div>
      {/* Date */}
      <p className="text-xs">24/05/2023</p>
    </div>
  );
};

export default UserCard;
