import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "loading",
  id: 0,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
