import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/types/User";
import { fetchMe } from "./api/fetchMe";

interface CommonState {
  currentUser: User | null;
}

const initialState: CommonState = {
  currentUser: null,
};

/* Thunks */

export const fetchCurrentUser = createAsyncThunk(
  "common/fetchCurrentUser",
  async () => {
    const currentUserRes = await fetchMe();
    const user = currentUserRes.data;
    return user;
  }
);

/* Slice declaration */

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    clearCurrentUser(state, action) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      console.log("action reduxer", action);
      state.currentUser = action.payload;
    }),
});

export default commonSlice.reducer;
