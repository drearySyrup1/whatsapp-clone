import React, { useEffect, useState } from "react";
import ProfileImg from "../../ProfileImg";
import { PencilIcon } from "@heroicons/react/24/outline";
import TabGeneral from "../TabGeneral";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { showSuccessAlert } from "../../../features/visibleStateSlice";

const AccountTab = () => {
  const {
    user: { id },
  } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    dispatch(showSuccessAlert(`Copied successfully`));
  };
  return (
    <TabGeneral className={"flex flex-col gap-4"}>
      <div>
        <p className="text-sm text-white opacity-50">Your ID</p>
        <Tooltip placement="bottom-start" title="Click to copy" arrow>
          <p onClick={copyToClipboard} className="cursor-pointer text-sm">
            {id}
          </p>
        </Tooltip>
      </div>
    </TabGeneral>
  );
};

export default AccountTab;
