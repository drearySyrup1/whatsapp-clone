import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import LoginRegisterWrapper from "../components/LoginRegisterWrapper";
import LinkCustom from "../components/LinkCustom";
import Button from "../components/Button";
import { Alert, Slide, Snackbar } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../features/visibleStateSlice";
import { ImSpinner2 } from "react-icons/im";
import { validEmail } from "../helpers";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
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

    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed in
      const user = userCredential.user;

      setIsLoading(false);

      // ...
      dispatch(showSuccessAlert(`Login successfull`));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      setIsLoading(false);

      dispatch(showErrorAlert(`${errorCode} - ${errorMessage}`));
    }
  };

  return (
    <LoginRegisterWrapper>
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="text"
      />
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <Button onClick={handleLogin}>
        <div className="flex justify-center">
          {isLoading ? (
            <ImSpinner2 className="animate-spin w-6 h-6" />
          ) : (
            "Login"
          )}
        </div>
      </Button>
      <p className="text-center">
        Don't have an account?{" "}
        <LinkCustom
          path="/register"
          className="
            text-emerald-700
            hover:underline
            "
        >
          Register
        </LinkCustom>
      </p>
    </LoginRegisterWrapper>
  );
};

export default Login;
