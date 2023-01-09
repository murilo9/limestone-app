import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "./types/User";

interface UsersState {
  entities: { [id: string]: User };
}

const initialState: UsersState = {
  entities: {},
};

const addUser = createAsyncThunk("boards/addUser", async () => {});
const fetchUsers = createAsyncThunk("boards/fetchUsers", async () => {});
const updateUser = createAsyncThunk("boards/updateUser", async () => {});
const deactivateUser = createAsyncThunk(
  "boards/deactivateUser",
  async () => {}
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersAdded(state, action) {},
    userUpdated(state, action) {},
    clearUsers(state, action) {},
  },
});

/* todo: export actions */

export default usersSlice.reducer;
