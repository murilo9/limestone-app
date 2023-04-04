import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserEntity } from "../users/types/User";
import { fetchMe } from "./api/fetchMe";
import { ConfirmationDialogConfig } from "./types/ConfirmationDialogConfig";
import { ToastNotificationConfig } from "./types/ToastNotificationConfig";

interface CommonState {
  // If a config exists, show the confirmation dialog
  confirmationDialogCurrentConfig: ConfirmationDialogConfig | null;
  currentToastNotification: ToastNotificationConfig | null;
}

const initialState: CommonState = {
  confirmationDialogCurrentConfig: null,
  currentToastNotification: null,
};

/* Slice declaration */

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
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
});

export const {
  confirmationDialogOpened,
  confirmationDialogClosed,
  toastNotificationSent,
  toastNotificationCleared,
} = commonSlice.actions;

export default commonSlice.reducer;
