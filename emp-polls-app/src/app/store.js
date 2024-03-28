import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/usersSlice";
import questionsReducer from "../features/questions/questionsSlice";
import authUserReducer from "../features/authUser/authUserSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    authUser: authUserReducer,
    questions: questionsReducer,
  },
});
