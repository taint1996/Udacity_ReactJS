import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../../utils/_DATA";
import { User } from "../../models/User";
import { RootState } from "../../store";

import { sortedUsers } from "../../../utils/usersUtil";
import { selectUserLoggedIn } from "../auth/authSlice";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void, { state: RootState }>(
  "users/fetchUsers",
  async (_, { rejectWithValue, getState }) => {
    try {
      const loggedInUser = selectUserLoggedIn(getState() as RootState);

      const response: Record<string, User> = await _getUsers();
      const users: User[] = [...Object.values(response)] || [];
      const currUser = users.find((u) => u.id === loggedInUser?.id);
      const mergedUser = { ...currUser, ...loggedInUser } as User;
      const updateUser = [
        ...users.filter((u) => u.id !== mergedUser.id),
        mergedUser,
      ];

      return sortedUsers(updateUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue("An error occurred while fetching users.");
      }
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload;
    },
    saveUsersOfNewQuestion: (
      state,
      action: PayloadAction<{ userId: string; questionId: string }>
    ) => {
      const { userId, questionId } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        state.users[userIndex].questions.push(questionId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default usersSlice.reducer;
export const { getUsers, saveUsersOfNewQuestion } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
