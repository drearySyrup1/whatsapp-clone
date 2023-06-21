import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fadeout: false,
  fadein: false,
};

export const multiTabSlice = createSlice({
  name: "multiTab",
  initialState,
  reducers: {
    fadein: (state) => {
      state.fadeout = false;
      state.fadein = true;
    },
    fadeout: (state) => {
      state.fadein = false;
      state.fadeout = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fadein, fadeout } = multiTabSlice.actions;

export default multiTabSlice.reducer;
