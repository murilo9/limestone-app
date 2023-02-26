import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "../users/types/User";
import { fetchMe } from "./api/fetchMe";
import { ConfirmationDialogConfig } from "./types/ConfirmationDialogConfig";
import { ToastNotificationConfig } from "./types/ToastNotificationConfig";

interface CommonState {
  currentUser: UserEntity | null;
  // If a config exists, show the confirmation dialog
  confirmationDialogCurrentConfig: ConfirmationDialogConfig | null;
  currentToastNotification: ToastNotificationConfig | null;
}

const initialState: CommonState = {
  currentUser: null,
  confirmationDialogCurrentConfig: null,
  currentToastNotification: {
    message: "Lorem ipsum dolor sit amet",
    type: "info",
  },
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
    toastNotificationSent(
      state,
      action: PayloadAction<ToastNotificationConfig>
    ) {
      const notification = action.payload;
      state.currentToastNotification = notification;
    },
    toastNotificationCleared(state, action: PayloadAction<void>) {
      state.currentToastNotification = null;
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
  toastNotificationSent,
  toastNotificationCleared,
} = commonSlice.actions;

export default commonSlice.reducer;
