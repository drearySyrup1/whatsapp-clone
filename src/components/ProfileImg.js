import React from "react";
import UserAvatarIcon from "./icons/UserAvatarIcon";

const ProfileImg = ({ size, className }) => {
  return (
    <div
      className={`${className} grid aspect-square w-${size} place-content-center rounded-full bg-zinc-500`}
    >
      <UserAvatarIcon className="h-6 w-6 text-zinc-800" />
    </div>
  );
};

export default ProfileImg;
