import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CardPrioritySelector from "../../boards/components/CardPrioritySelector";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Close } from "@mui/icons-material";
import { createUserModalChanged, onCreateUser } from "../usersSlice";
import { CreateUserDto } from "../types/dto/CreateUserDto";
import { toastNotificationSent } from "../../common/commonSlice";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function CreateUserModal() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);
  const [showInvalidEmailError, setShowInvalidEmailError] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const dispatch = useAppDispatch();
  const showCreateUserModal = useAppSelector(
    (state) => state.users.showCreateUserModal
  );

  const mayCreateUser =
    userFirstName && userLastName && userEmail && !emailIsInvalid;

  const validateEmail = () => {
    const isValid = emailRegex.test(userEmail);
    if (userEmail) {
      setEmailIsInvalid(!isValid);
    }
  };

  useEffect(validateEmail, [userEmail]);

  const onEmailInputBlur = () => {
    setShowInvalidEmailError(emailIsInvalid);
  };

  const onCloseModal = () => {
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    dispatch(createUserModalChanged(false));
  };

  const onCreateUserFailure = (error: any) => {
    dispatch(
      toastNotificationSent({
        message:
          "There was an error while creating the user. Please try again.",
        type: "error",
      })
    );
  };

  const onCreateUserSuccess = () => {
    dispatch(
      toastNotificationSent({
        message: "User created successfully.",
        type: "success",
      })
    );
    onCloseModal();
  };

  const onCreateUserClick = () => {
    if (mayCreateUser) {
      const createUserDto: CreateUserDto = {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
      };
      dispatch(onCreateUser(createUserDto))
        .unwrap()
        .catch(onCreateUserFailure)
        .then(onCreateUserSuccess);
    }
  };

  return (
    <>
      <Dialog
        onClose={onCloseModal}
        open={showCreateUserModal}
        PaperProps={{
          sx: {
            width: "380px",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: `1px solid rgba(0,0,0,0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 2,
          }}
        >
          <span>New User</span>
          <IconButton onClick={onCloseModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ my: 3 }}>
          <>
            <Typography variant="subtitle2">First Name</Typography>
            <TextField
              variant="standard"
              placeholder="First Name"
              fullWidth
              value={userFirstName}
              onChange={(event) => setUserFirstName(event.target.value)}
            />
            <Typography
              variant="subtitle2"
              sx={{ mt: 3, mb: 1 }}
            >
              Last Name
            </Typography>
            <TextField
              variant="standard"
              placeholder="Last Name"
              fullWidth
              value={userLastName}
              onChange={(event) => setUserLastName(event.target.value)}
            />
            <Typography
              variant="subtitle2"
              sx={{ mt: 3, mb: 1 }}
            >
              E-mail
            </Typography>
            <TextField
              variant="standard"
              placeholder="E-mail"
              fullWidth
              value={userEmail}
              onChange={(event) => setUserEmail(event.target.value)}
              error={emailIsInvalid && showInvalidEmailError}
              onBlur={onEmailInputBlur}
              helperText={
                emailIsInvalid && showInvalidEmailError
                  ? "Please provide a valid e-mail address"
                  : "An invite will be sent to this e-mail address"
              }
            />
          </>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid rgba(0,0,0,0.15)` }}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={onCreateUserClick}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            disabled={!mayCreateUser || isCreatingUser}
            onClick={onCreateUserClick}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
