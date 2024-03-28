import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setAuthUser } = authUserSlice.actions;

export const selectAuthUser = (state) => state.authUser.current;

export default authUserSlice.reducer;
