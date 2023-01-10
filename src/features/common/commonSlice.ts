import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../users/types/User";

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
    return {} as User;
  }
);

/* Slice declaration */

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      console.log("action reduxer", action);
      state.currentUser = action.payload;
    }),
});

export default commonSlice.reducer;
