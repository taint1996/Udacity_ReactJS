import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { User } from "../../models/User";
import { _getQuestions, _getUsers } from "../../../utils/_DATA";
import { Question } from "../../models/Question";

export interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const saveStateToStorage = (state: UserState) => {
  localStorage.setItem("userLoggedIn", state.isLoggedIn.toString());
  localStorage.setItem("user", JSON.stringify(state.user));
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User | null>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      saveStateToStorage(state);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      saveStateToStorage(state);
    },
    saveUserAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>
    ) => {
      if (state.user) {
        state.user.answers[action.payload.questionId] = action.payload.answer;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    saveUserQuestion: (
      state,
      action: PayloadAction<{ question: Question }>
    ) => {
      const { question } = action.payload;

      if (state.user) {
        state.user.questions.push(question.id);
      }
    },
  },
});

export const getAllUsersQuestionsData = createAsyncThunk(
  "app/getAllUsersQuestionsData",
  async () => {
    try {
      const [usersRecord, questionsRecord] = await Promise.all([
        _getUsers(),
        _getQuestions(),
      ]);

      const users = Object.values(usersRecord);
      const questions = Object.values(questionsRecord);

      return { users, questions };
    } catch (error) {
      console.error("Error fetching app data:", error);
    }
  }
);

export const { login, logout, saveUserAnswer, saveUserQuestion } =
  authSlice.actions;
export const selectUserLoggedIn = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export default authSlice.reducer;
