import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoadingBar, showLoadingBar } from "../features/visibleStateSlice";
const LinkCustom = ({ onClick, className, children, path, duration = 500 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pressed, setPressed] = useState(false);
  const handleClick = () => {
    if (pressed) return;
    setPressed(true);
    dispatch(showLoadingBar());
    setTimeout(() => {
      setPressed(false);
      dispatch(hideLoadingBar());
      if (path) navigate(path);
      if (onClick) onClick();
    }, duration);
  };
  return (
    <div
      onClick={handleClick}
      className={"cursor-pointer inline-block " + className}
    >
      {children}
    </div>
  );
};

export default LinkCustom;
