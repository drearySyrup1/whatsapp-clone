import React, { useState } from "react";
import { AiOutlineInfoCircle, AiOutlineUserAdd } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import { BsBrush } from "react-icons/bs";
import { GoKeyboard } from "react-icons/go";
import { IoChatbubblesOutline, IoServerOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { VscKey } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import Option from "../Option";
import GeneralTab from "./TabContent/GeneralTab";
import AccountTab from "./TabContent/AccountTab";
import { fadein, fadeout } from "../../features/multiTabSlice";
import AddContact from "./TabContent/AddContact";
import FriendRequests from "./TabContent/FriendRequests";

function getComponent(name) {
  switch (name) {
    case "general":
      return <GeneralTab />;
    case "account":
      return <AccountTab />;
    case "addcontact":
      return <AddContact />;
    case "friendrequests":
      return <FriendRequests />;
    default:
      return null;
  }
}

const MultiTab = () => {
  const { isProfileOpen } = useSelector((state) => state.visibleState);
  const [openTabName, setOpenTabName] = useState("general");
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = useState(false);
  const openTab = (tab) => {
    if (openTabName === tab) return;
    if (isBusy) return;
    setIsBusy(true);
    dispatch(fadeout());
    setTimeout(() => {
      setOpenTabName(tab);
      dispatch(fadein());
      setIsBusy(false);
    }, 200);
  };

  return (
    <div
      data-profileWindow
      className={`${
        isProfileOpen ? "translate-y-0" : "translate-y-[110%]"
      } fixed bottom-3 left-3 z-10 rounded-lg 
         w-[500px] h-[550px] 
         bg-zinc-900 bg-opacity-90
         backdrop-blur-sm
        shadow-[0_0_30px_0_rgb(0_0_0_/0.4)]
        transition-[transform] duration-500
        grid grid-cols-[1fr_1.5fr]
        `}
    >
      <div
        className="p-2 border-r-[1px]
         border-zinc-600
        space-y-2
         "
      >
        <Option
          name="general"
          openTabName={openTabName}
          onClick={() => openTab("general")}
        >
          <RiComputerLine size={17} />
          General
        </Option>
        <Option
          name="account"
          openTabName={openTabName}
          onClick={() => openTab("account")}
        >
          <VscKey size={17} />
          Account
        </Option>
        <Option
          name="addcontact"
          openTabName={openTabName}
          onClick={() => openTab("addcontact")}
        >
          <AiOutlineUserAdd size={17} />
          Add Contact
        </Option>
        <Option
          name="friendrequests"
          openTabName={openTabName}
          onClick={() => openTab("friendrequests")}
        >
          <AiOutlineUserAdd size={17} />
          Friend Requests
        </Option>
        {/* <Option name="notifications" openTabName={openTabName}>
          <BiBell size={17} />
          Notifications
        </Option>
        <Option name="personalization" openTabName={openTabName}>
          <BsBrush size={17} />
          Personalization
        </Option>
        <Option name="storage" openTabName={openTabName}>
          <IoServerOutline size={17} />
          Storage
        </Option>
        <Option name="shortcuts" openTabName={openTabName}>
          <GoKeyboard size={17} />
          Shortcuts
        </Option> */}
        <Option name="help" openTabName={openTabName}>
          <AiOutlineInfoCircle size={17} />
          Help
        </Option>
      </div>
      {getComponent(openTabName)}
    </div>
  );
};

export default MultiTab;
