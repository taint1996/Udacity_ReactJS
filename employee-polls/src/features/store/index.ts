import {
  configureStore,
  createImmutableStateInvariantMiddleware,
} from "@reduxjs/toolkit";
import authReducer from "../slice/auth/authSlice";
import questionsReducer from "../slice/questions/questionsSlice";
import usersReducer from "../slice/users/usersSlice";
import { useDispatch } from "react-redux";

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
  ignoredPaths: ["ignoredPath", "ignoredNested.one", "ignoredNested.two"],
});

export const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(immutableInvariantMiddleware);
  },
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
