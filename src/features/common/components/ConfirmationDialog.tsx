import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { ConfirmationDialogConfig } from "../types/ConfirmationDialogConfig";

type ConfirmationDialogProps = {
  open: boolean;
  onClose: () => void;
  onActionClick: (index: number) => void;
  config: ConfirmationDialogConfig;
};

export default function ConfirmationDialog({
  open,
  config,
  onClose,
  onActionClick,
}: ConfirmationDialogProps) {
  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
      >
        {config.title ? (
          <DialogTitle color="black">{config.title}</DialogTitle>
        ) : null}
        <DialogContent>
          <Typography
            variant="subtitle1"
            sx={{ py: 2 }}
          >
            {config.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ borderTop: `1px solid rgba(0,0,0,0.15)` }}>
          {config.hideCancelAction ? null : (
            <Button onClick={onClose}>Cancel</Button>
          )}
          {config.actions.map((action, index) => (
            <Button
              color={action.type}
              onClick={() => onActionClick(index)}
            >
              {action.title}
            </Button>
          ))}
        </DialogActions>
      </Dialog>
    </>
  );
}
