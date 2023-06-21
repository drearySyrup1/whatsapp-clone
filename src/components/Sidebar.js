import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import PencilNoteIcon from "./icons/PencilNoteIcon";
import ThreeDotsIcon from "./icons/ThreeDotsIcon";
import SearchIcon from "./icons/SearchIcon";
import ProfileImg from "./ProfileImg";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  closeProfileWindow,
  openProfileWindow,
  showSuccessAlert,
} from "../features/visibleStateSlice";
import MultiTab from "./MultiTab/MultiTab";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import LinkCustom from "./LinkCustom";
import { collection, onSnapshot, query, where } from "firebase/firestore";
const Sidebar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.user);
  const [notificationCount, setNotificationcount] = useState(0);
  const { isProfileOpen } = useSelector((state) => state.visibleState);

  useEffect(() => {
    const q = query(
      collection(db, "friendRequests"),
      where("receiver", "==", currentUser.id)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let count = 0;
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added" && change.doc.data().status === "pending") {
          dispatch(showSuccessAlert("You got new friend request!"));
          count += 1;
        }
      });
      setNotificationcount(count);
    });
    return unsubscribe;
  }, [currentUser.id]);

  useEffect(() => {
    const windowClick = (e) => {
      const element = e.target;
      const openButton = document.querySelector("[data-openProfileButton]");
      const parent = document.querySelector(`[data-profileWindow]`);

      if (
        parent.contains(element) === false &&
        isProfileOpen === true &&
        !openButton.contains(e.target)
      ) {
        dispatch(closeProfileWindow());
      }
    };

    window.addEventListener("click", windowClick);
    return () => window.removeEventListener("click", windowClick);
  }, [isProfileOpen]);

  return (
    <div className="relatve grid max-h-screen grid-rows-[auto_1fr_auto] border-zinc-900 p-4 pb-0 md:border-r-2">
      {/* TOP */}
      <div className="mb-3 space-y-2">
        {/* TOP TOP */}
        <div className="flex gap-2">
          <p className="flex-grow text-lg font-bold">Chats</p>
          <PencilNoteIcon className="buttonhover" />
          <ThreeDotsIcon className="buttonhover" />
        </div>
        {/* INPUT */}
        <div className="flex items-center rounded-md border-b border-b-zinc-400 bg-zinc-700 px-3 py-2 transition-[border] duration-200 focus-within:border-b-[3px] focus-within:border-green-500">
          <input
            placeholder="Search"
            className="flex-grow bg-transparent text-sm placeholder:text-sm focus:outline-none"
            type=""
          />
          <SearchIcon className="h-4 w-4" />
        </div>
      </div>
      {/* CHATS LIST */}
      <div className="scrollbarcustom space-y-1 overflow-y-auto">
        {/* CHAT */}
        {Array(20)
          .fill()
          .map((_, i) => (
            <UserCard />
          ))}
      </div>
      {/* BOTTOM OF SIDEBAR */}
      <div className="flex items-center gap-3 py-3">
        <div
          data-openProfileButton
          onClick={() => {
            dispatch(openProfileWindow());
          }}
          className={`buttonhover grid place-content-center relative`}
        >
          {/* notification circle */}
          <div
            className={`
          ${notificationCount <= 0 && "opacity-0"}
          absolute top-[-1px] right-[-1px]
          bg-red-600 w-4 h-4 grid place-content-center
          text-sm rounded-full
          `}
          >
            {notificationCount}
          </div>
          <ProfileImg size={8} />
        </div>
        <LinkCustom
          onClick={() => signOut(auth)}
          className="buttonhover grid place-items-center"
        >
          <BiLogOut className="w-6 h-6" />
        </LinkCustom>
      </div>
      <MultiTab />
    </div>
  );
};

export default Sidebar;
