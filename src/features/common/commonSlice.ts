import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "../users/types/User";
import { fetchMe } from "./api/fetchMe";
import { ConfirmationDialogConfig } from "./types/ConfirmationDialogConfig";

interface CommonState {
  currentUser: UserEntity | null;
  // If a config exists, show the confirmation dialog
  confirmationDialogCurrentConfig: ConfirmationDialogConfig | null;
}

const initialState: CommonState = {
  currentUser: null,
  confirmationDialogCurrentConfig: null,
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
    confirmationDialogOpened(
      state,
      action: PayloadAction<ConfirmationDialogConfig>
    ) {
      const confirmationDialogConfig = action.payload;
      state.confirmationDialogCurrentConfig = confirmationDialogConfig;
    },
    confirmationDialogClosed(state, action: PayloadAction<void>) {
      state.confirmationDialogCurrentConfig = null;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    }),
});

export const {
  confirmationDialogOpened,
  confirmationDialogClosed,
  clearCurrentUser,
} = commonSlice.actions;

export default commonSlice.reducer;
