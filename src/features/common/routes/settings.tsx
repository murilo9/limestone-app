import {
  ArrowDownward,
  ArrowDownwardSharp,
  KeyboardArrowDown,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { UserEntity } from "../../users/types/User";
import { deactivateAccount } from "../api/deactivateAccount";
import { passwordChange } from "../api/passwordChange";
import { toastNotificationSent } from "../commonSlice";
import { useAuth } from "../hooks/useAuth";
import { SignProvider } from "../types/SignProvider";

export default function SettingsPage() {
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [confirmAccountDeactivation, setConfirmAccountDeactivation] =
    useState(false);
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector(
    (state) => state.users.loggedUser
  ) as UserEntity;
  const theme = useTheme();
  const { signOut } = useAuth();

  const accountwasCreatedWithFederatedEntity =
    loggedUser.signProvider !== SignProvider.NONE;
  const [currentPassword, setCurrentPassword] = useState(
    accountwasCreatedWithFederatedEntity
      ? (window.localStorage.getItem("google_user_id") as string)
      : ""
  );
  const newPasswordsAreEqual = newPassword === newPasswordAgain;
  const canChangePassword =
    currentPassword && newPassword && newPasswordAgain && newPasswordsAreEqual;

  const verifyPasswordsAreEqual = () => {
    setPasswordErrorMessage(
      newPasswordsAreEqual ? "" : "Passwords must be equal"
    );
  };

  const resetState = () => {
    setCurrentPassword(
      accountwasCreatedWithFederatedEntity
        ? (window.localStorage.getItem("google_user_id") as string)
        : ""
    );
    setNewPassword("");
    setNewPasswordAgain("");
    setShowPasswords(false);
    setConfirmAccountDeactivation(false);
  };

  const onPasswordChangeClick = () => {
    setFetching(true);
    passwordChange(currentPassword, newPassword)
      .then(() => {
        dispatch(
          toastNotificationSent({
            message: "Password changed successfully.",
            type: "success",
          })
        );
        resetState();
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          toastNotificationSent({
            message: "Something went wrong with your request. Please try again",
            type: "error",
          })
        );
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const onDeactivateAccountConfirm = () => {
    setFetching(true);
    deactivateAccount(loggedUser._id)
      .catch((error) => {
        dispatch(
          toastNotificationSent({
            message: "Something went wrong with your request. Please try again",
            type: "error",
          })
        );
      })
      .then(() => {
        signOut();
      })
      .finally(() => {
        setFetching(false);
      });
  };

  return (
    <>
      <Box
        className="lim-settings-page"
        sx={{
          px: "0 !important",
          margin: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="xl"
          sx={{ px: "0 !important" }}
        >
          <Typography
            variant="h4"
            sx={{ my: 3 }}
          >
            Settings
          </Typography>
          <Accordion
            elevation={0}
            disableGutters
            disabled
            sx={{
              bgcolor: "transparent !important",
              ".MuiAccordionSummary-content": {
                alignItems: "center !important",
              },
            }}
          >
            <AccordionSummary expandIcon={<KeyboardArrowDown />}>
              <Typography
                variant="subtitle1"
                color="black"
              >
                Notifications
              </Typography>
              <Typography
                variant="caption"
                sx={{ ml: 2 }}
              >
                Coming soon
              </Typography>
            </AccordionSummary>
            <AccordionDetails></AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            disableGutters
          >
            <AccordionSummary expandIcon={<KeyboardArrowDown />}>
              <Typography
                variant="subtitle1"
                color="black"
              >
                Password Change
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {accountwasCreatedWithFederatedEntity ? (
                <Typography
                  variant="body2"
                  color={theme.palette.warning.main}
                  sx={{ mb: 2 }}
                >
                  Password change is disabled for accounts created with
                  federated entities (Google, Facebook, etc).
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ mb: 2 }}
                >
                  Type your current password in order to change it.
                </Typography>
              )}
              <Box
                maxWidth="300px"
                sx={{
                  display: accountwasCreatedWithFederatedEntity
                    ? "none"
                    : "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Switch
                    checked={showPasswords}
                    onChange={(event) => setShowPasswords(event.target.checked)}
                  />
                  Show passwords
                </Box>
                {loggedUser.signProvider === SignProvider.NONE ? (
                  <TextField
                    variant="standard"
                    label="Current password"
                    value={currentPassword}
                    onChange={(event) => setCurrentPassword(event.target.value)}
                    sx={{ mb: 2 }}
                    type={showPasswords ? "text" : "password"}
                  />
                ) : null}
                <TextField
                  variant="standard"
                  label="New password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  sx={{ mb: 2 }}
                  type={showPasswords ? "text" : "password"}
                />
                <TextField
                  variant="standard"
                  label="Retype new password"
                  value={newPasswordAgain}
                  onChange={(event) => setNewPasswordAgain(event.target.value)}
                  error={!!passwordErrorMessage}
                  helperText={passwordErrorMessage}
                  onBlur={verifyPasswordsAreEqual}
                  sx={{ mb: 2 }}
                  type={showPasswords ? "text" : "password"}
                />
                <Button
                  disableElevation
                  variant="contained"
                  sx={{ mt: 3 }}
                  disabled={!canChangePassword || fetching}
                  onClick={onPasswordChangeClick}
                >
                  Change Password
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion
            elevation={0}
            disableGutters
          >
            <AccordionSummary expandIcon={<KeyboardArrowDown />}>
              <Typography
                variant="subtitle1"
                color="black"
              >
                Deactivate account
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                maxWidth="300px"
                sx={{
                  my: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography variant="body2">
                  That will permanently remove your account from our database.
                </Typography>
                {confirmAccountDeactivation ? (
                  <Box sx={{ mt: 3 }}>
                    <Button
                      disableElevation
                      variant="contained"
                      onClick={() => setConfirmAccountDeactivation(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      disableElevation
                      color="error"
                      sx={{ ml: 2 }}
                      variant="contained"
                      onClick={onDeactivateAccountConfirm}
                    >
                      Click to Confirm
                    </Button>
                  </Box>
                ) : (
                  <Button
                    disableElevation
                    color="error"
                    sx={{ mt: 3 }}
                    variant="contained"
                    onClick={() => setConfirmAccountDeactivation(true)}
                  >
                    Deactivate Account
                  </Button>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Box>
    </>
  );
}
