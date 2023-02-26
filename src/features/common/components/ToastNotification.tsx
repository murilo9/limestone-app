import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toastNotificationCleared } from "../commonSlice";

export default function ToastNotification() {
  const dispatch = useAppDispatch();
  const currentToastNotification = useAppSelector(
    (state) => state.common.currentToastNotification
  );
  const showToast = currentToastNotification !== null;

  const onToastClose = () => {
    dispatch(toastNotificationCleared());
  };

  return (
    <>
      {/* Obs: has to put this verification here to avoid alert buggy behavior */}
      {showToast ? (
        <Snackbar
          open={true}
          onClose={onToastClose}
          autoHideDuration={8000}
          anchorOrigin={{
            horizontal: "center",
            vertical: "bottom",
          }}
        >
          <Alert
            severity={currentToastNotification.type}
            onClose={onToastClose}
            action={
              <IconButton size="small">
                <Close />
              </IconButton>
            }
            sx={{
              ".MuiAlert-action": {
                pt: 0,
                alignItems: "center",
              },
            }}
          >
            {currentToastNotification.message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}
