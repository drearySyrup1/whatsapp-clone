import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import LoginRegisterWrapper from "../components/LoginRegisterWrapper";
import LinkCustom from "../components/LinkCustom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../features/visibleStateSlice";
import { validEmail } from "../helpers";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  reload,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { ImSpinner2 } from "react-icons/im";

const Register = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleRegistration = async () => {
    if (username === "") {
      dispatch(showErrorAlert("Please enter username."));
      return;
    }

    const q = query(collection(db, "users"), where("username", "==", username));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty === true) {
      dispatch(showErrorAlert(`${username} already exists`));
      return;
    }

    if (email === "") {
      dispatch(showErrorAlert("Please enter email."));
      return;
    }
    if (!validEmail(email)) {
      dispatch(showErrorAlert("Please enter valid email."));
      return;
    }

    if (password === "") {
      dispatch(showErrorAlert("Please enter password."));
      return;
    }
    if (password2 === "") {
      dispatch(showErrorAlert("Please repeat password."));
      return;
    }

    if (password !== password2) {
      dispatch(showErrorAlert("Passwords don't match."));
      return;
    }

    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;

      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, {
        username: username,
        about: "Hey I'm using Whatsapp!",
        friends: [],
      });
      setIsLoading(false);
      // ...
      dispatch(showSuccessAlert(`Success user created!`));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      setIsLoading(false);

      dispatch(showErrorAlert(`${errorCode} - ${errorMessage}`));
    }
    // ..
  };
  return (
    <LoginRegisterWrapper>
      <Input
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        placeholder="Username"
        type="text"
      />
      <Input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email"
        type="text"
      />
      <Input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password"
        type="password"
      />
      <Input
        onChange={(e) => setPassword2(e.target.value)}
        value={password2}
        placeholder="Repeart password"
        type="password"
      />
      <Button onClick={handleRegistration}>
        <div className="flex justify-center">
          {isLoading ? (
            <ImSpinner2 className="animate-spin w-6 h-6" />
          ) : (
            "Register"
          )}
        </div>
      </Button>

      <p className="text-center">
        Have an account?{" "}
        <LinkCustom
          path="/login"
          className="
            text-emerald-700
            hover:underline
            "
        >
          Login
        </LinkCustom>
      </p>
    </LoginRegisterWrapper>
  );
};

export default Register;
