import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  isProfileOpen: false,
  isLoadingBarVisible: false,
  alertVisible: false,
  alertMessage: "",
  alertType: "success",
};

export const visibleStatesSlice = createSlice({
  name: "visibleStates",
  initialState,
  reducers: {
    openProfileWindow: (state) => {
      state.isProfileOpen = true;
    },
    closeProfileWindow: (state) => {
      state.isProfileOpen = false;
    },
    showLoadingBar: (state) => {
      state.isLoadingBarVisible = true;
    },
    hideLoadingBar: (state) => {
      state.isLoadingBarVisible = false;
    },
    showErrorAlert: (state, action) => {
      state.alertVisible = true;
      state.alertMessage = action.payload;
      state.alertType = "error";
    },
    hideAlert: (state) => {
      state.alertVisible = false;
    },
    showSuccessAlert: (state, action) => {
      state.alertVisible = true;
      state.alertMessage = action.payload;
      state.alertType = "success";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  openProfileWindow,
  closeProfileWindow,
  showLoadingBar,
  hideLoadingBar,
  hideAlert,
  showErrorAlert,
  showSuccessAlert,
  changeAlertType,
} = visibleStatesSlice.actions;

export default visibleStatesSlice.reducer;
