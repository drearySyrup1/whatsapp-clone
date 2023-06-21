import React, { useEffect, useState } from "react";
import ProfileImg from "../../ProfileImg";
import TabGeneral from "../TabGeneral";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
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

const FriendRequests = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userSlice.user);
  const [friendRequests, setFriendRequests] = useState([]);

  const acceptFriendRequest = async (request) => {
    if (await isAlreadyFriend(request.receiver, request.sender.id)) {
      dispatch(showErrorAlert("Already friend"));
      return;
    }
    const sendersRef = doc(db, "users", request.sender.id);
    const receiversRef = doc(db, "users", request.receiver);
    await updateDoc(sendersRef, { friends: arrayUnion(request.receiver) });
    await updateDoc(receiversRef, { friends: arrayUnion(request.sender.id) });

    const requestRef = doc(db, "friendRequests", request.id);
    await updateDoc(requestRef, {
      status: "fullfilled",
    });

    dispatch(showSuccessAlert("Friend request accepted"));
  };
  const denyFriendRequest = async (request) => {
    const requestRef = doc(db, "friendRequests", request.id);
    await updateDoc(requestRef, {
      status: "denied",
    });

    dispatch(showSuccessAlert("Friend request denied"));
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      const q = query(
        collection(db, "friendRequests"),
        where("receiver", "==", currentUser.id),
        where("status", "==", "pending")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const asyncTasks = snapshot.docs.map(async (document) => {
            const data = document.data();
            const senderDocRef = doc(db, "users", data.sender);
            const senderSnapshot = await getDoc(senderDocRef);
            const sender = { id: senderSnapshot.id, ...senderSnapshot.data() };

            return { id: document.id, ...data, sender: sender };
          });
          Promise.all(asyncTasks).then((results) => {
            setFriendRequests(results);
          });
        } else {
          setFriendRequests([]);
        }
      });

      return unsubscribe;
    };
    fetchFriendRequests();
  }, []);
  return (
    <TabGeneral
      key="general"
      className={"flex flex-col overflow-auto scrollbarcustom gap-3"}
    >
      {/* PROFILE CARD */}
      {friendRequests.length > 0 &&
        friendRequests.map((request) => {
          return (
            <div className="flex items-center">
              <div
                className="bg-zinc-900
            w-full rounded-md
            p-4
            items-center
            flex  gap-2
            "
              >
                <ProfileImg size={10} />
                <p className="text-white opacity-90 text-base font-semibold"></p>
                <p className="text-white opacity-90 text-sm flex-1">
                  {request.sender.username}
                </p>
                <AiOutlineCheck
                  onClick={() => acceptFriendRequest(request)}
                  className="buttonhover"
                />
                <RxCross2
                  onClick={() => denyFriendRequest(request)}
                  className="buttonhover"
                />
              </div>
            </div>
          );
        })}
      {friendRequests.length <= 0 && (
        <div className="mt-4 flex flex-col items-center gap-7">
          <p className="font-bold">No friend requests</p>
        </div>
      )}
    </TabGeneral>
  );
};

export default FriendRequests;
