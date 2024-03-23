import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../types/user";
import { RootState } from "../types";

type UserSliceState = {
  data: UserData[];
};

const initialState: UserSliceState = {
  data: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<UserData>) {
      const filteredData = state.data.filter(
        (user) => user.key !== action.payload.key
      );

      state.data = [...filteredData, action.payload];
    },
    removeUser(state, action: PayloadAction<{ key: string }>) {
      state.data = state.data.filter((user) => user.key !== action.payload.key);
    },

    editUser(state, action: PayloadAction<UserData>) {
      const userIndex = state.data.findIndex(
        (user) => user.key === action.payload.key
      );

      if (userIndex !== -1) {
        state.data[userIndex] = action.payload;
      }
    },
  },
});

export default userSlice.reducer;

export const selectUsers = (state: RootState) => state.user;

export const { addUser, removeUser, editUser } = userSlice.actions;
