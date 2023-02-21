import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  confirmationDialogClosed,
  confirmationDialogOpened,
} from "../commonSlice";
import { ConfirmationDialogConfig } from "../types/ConfirmationDialogConfig";

export default function ConfirmationDialog() {
  const dispatch = useAppDispatch();
  const currentConfig = useAppSelector(
    (state) => state.common.confirmationDialogCurrentConfig
  );

  const showModal = !!currentConfig;

  const onCloseModal = () => {
    dispatch(confirmationDialogClosed());
  };

  const onActionClick = (index: number) => {
    currentConfig?.actions[index].onClick();
    dispatch(confirmationDialogClosed());
  };

  return (
    <>
      <Dialog
        onClose={onCloseModal}
        open={showModal}
      >
        {currentConfig ? (
          <>
            {currentConfig.title ? (
              <DialogTitle color="black">{currentConfig.title}</DialogTitle>
            ) : null}
            <DialogContent>
              <Typography
                variant="subtitle1"
                sx={{ py: 2 }}
              >
                {currentConfig.message}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ borderTop: `1px solid rgba(0,0,0,0.15)` }}>
              {currentConfig.hideCancelAction ? null : (
                <Button onClick={onCloseModal}>Cancel</Button>
              )}
              {currentConfig.actions.map((action, index) => (
                <Button
                  color={action.type}
                  onClick={() => onActionClick(index)}
                >
                  {action.title}
                </Button>
              ))}
            </DialogActions>
          </>
        ) : (
          "error-no-config-found"
        )}
      </Dialog>
    </>
  );
}
