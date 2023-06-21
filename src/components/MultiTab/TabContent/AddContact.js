import React, { useState } from "react";
import ProfileImg from "../../ProfileImg";
import TabGeneral from "../TabGeneral";
import Editable from "../Editable";
import Input from "../../Input";
import Button from "../../Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import {
  FieldPath,
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../features/visibleStateSlice";
import { isAlreadyFriend } from "../../../helpers";

const AddContact = () => {
  const [userIdInput, setUserIdInput] = useState("");
  const [initialLoad, setIntialLoad] = useState(true);
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userSlice.user);
  const [foundUser, setFoundUser] = useState(null);

  const addFriend = async () => {
    // check if trying to add yourself
    if (loggedInUser.id === foundUser.id) {
      dispatch(showErrorAlert("Cannot add yourself as a friend"));
      return;
    }

    if (await isAlreadyFriend(loggedInUser.id, foundUser.id)) {
      dispatch(showErrorAlert("This person already in your friend list"));
      return;
    }

    //check if already sent friend request
    const querySnapshot = await getDocs(
      query(
        collection(db, "friendRequests"),
        where("receiver", "==", foundUser.id),
        where("sender", "==", loggedInUser.id),
        where("status", "==", "pending")
      )
    );

    if (!querySnapshot.empty) {
      dispatch(
        showErrorAlert("You aleardy sent friend request to this person.")
      );
      return;
    }

    const friendRequestRef = collection(db, "friendRequests");
    await addDoc(friendRequestRef, {
      sender: loggedInUser.id,
      receiver: foundUser.id,
      status: "pending",
    });

    dispatch(
      showSuccessAlert(`You sent friend request to ${foundUser.username}`)
    );
  };

  const runSearch = async () => {
    if (userIdInput === "") return;

    const docRef = doc(db, "users", userIdInput);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(showSuccessAlert("User found"));
      setFoundUser({ id: docSnap.id, ...docSnap.data() });
    } else {
      dispatch(showErrorAlert("No such user"));
      setFoundUser(null);
    }
    setIntialLoad(false);
  };
  return (
    <TabGeneral key="general" className={"flex flex-col gap-3"}>
      <Input
        placeholder={"UserID"}
        value={userIdInput}
        onChange={(e) => setUserIdInput(e.target.value)}
      />
      <Button onClick={runSearch}>Search</Button>

      {/* DIVIDER */}
      <div
        className="
      w-full h-[2px] bg-zinc-900 rounded-lg
      "
      ></div>

      {/* PROFILE CARD */}
      {foundUser && (
        <div className="flex items-center">
          <div
            className="bg-zinc-900
          w-full rounded-md
          p-4
          items-center
          flex flex-col gap-2
          "
          >
            <ProfileImg size={10} />
            <p className="text-white opacity-90 text-base font-semibold">
              {foundUser?.username}
            </p>
            <p className="text-white opacity-90 text-sm">{foundUser?.about}</p>
            <AiOutlinePlus onClick={addFriend} className="buttonhover" />
          </div>
        </div>
      )}
      {/* ERROR */}
      {!foundUser && !initialLoad && (
        <div className="mt-4 flex flex-col items-center gap-7">
          <BiErrorCircle className="animate-ping text-red-300" size={40} />
          <p className="font-bold text-red-300">No such user found!</p>
        </div>
      )}
    </TabGeneral>
  );
};

export default AddContact;
