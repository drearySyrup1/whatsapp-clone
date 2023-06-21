import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../features/visibleStateSlice";

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

function getType(type, msg) {
  switch (type) {
    case "error":
      return <Alert severity="error">{msg}</Alert>;
    case "success":
      return <Alert severity="success">{msg}</Alert>;
    default:
      return null;
  }
}

const InfoPopup = () => {
  const { alertVisible, alertMessage, alertType } = useSelector(
    (state) => state.visibleState
  );
  const dispatch = useDispatch();
  return (
    <Snackbar
      TransitionComponent={TransitionDown}
      open={alertVisible}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={2000}
      onClose={() => dispatch(hideAlert())}
      message="Note archived"
      severity="error"
    >
      {getType(alertType, alertMessage)}
    </Snackbar>
  );
};

export default InfoPopup;
