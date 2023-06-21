import ProfileImg from "../../ProfileImg";
import TabGeneral from "../TabGeneral";
import Editable from "../Editable";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../features/visibleStateSlice";

const messages = {
  aboutUpdate: "About field updated.",
  usernameUpdate: "Username field updated.",
};

const GeneralTab = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [about, setAbout] = useState(user?.about);
  const [username, setUsername] = useState(user?.username);
  const dispatch = useDispatch();

  const updateField = async (newData, successMsg) => {
    const docRef = doc(db, "users", user.id);
    try {
      await updateDoc(docRef, newData);
      dispatch(showSuccessAlert(successMsg));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      dispatch(showErrorAlert(`${errorCode} - ${errorMessage}`));
    }
  };

  return (
    <TabGeneral key="general" className={"flex flex-col gap-4"}>
      <ProfileImg size={10} />

      <div className="flex items-centerg gap-2">
        <p className="font-semibold text-xl">{username}</p>
      </div>
      <div>
        <p className="text-sm text-white opacity-50">About</p>
        <div className="flex items-center gap-2">
          <Editable
            callback={() => updateField({ about: about }, messages.aboutUpdate)}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-white opacity-50">Phone number</p>
        <p className="text-sm">+61 433 832 074</p>
      </div>
    </TabGeneral>
  );
};

export default GeneralTab;
