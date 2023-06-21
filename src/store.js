import { configureStore } from "@reduxjs/toolkit";
import visibleStateReducer from "./features/visibleStateSlice";
import multiTabReducer from "./features/multiTabSlice";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    visibleState: visibleStateReducer,
    multiTab: multiTabReducer,
    userSlice: userReducer,
  },
});
