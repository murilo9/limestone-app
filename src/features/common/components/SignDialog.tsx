import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { signUp } from "../api/signUp";
import { useAuth } from "../hooks/useAuth";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import gLogo from "../assets/g-logo.png";
import { AxiosError } from "axios";
import RecoverPasswordForm from "./RecoverPasswordForm";
import { passwordRecovery } from "../api/passwordRecovery";

type SignDialogProps = {
  show: boolean;
  onClose: () => void;
};

export default function SignDialog({ show, onClose }: SignDialogProps) {
  const [mode, setMode] = useState<"signin" | "signup" | "forgot-password">(
    "signin"
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const { signIn, googleSign } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const closeDialog = () => {
    setMode("signin");
    setSuccessMessage("");
    onClose();
  };

  const onForgotPasswordClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setMode("forgot-password");
  };

  const onSignIn = (email: string, password: string) => {
    setFetching(true);
    signIn({
      email,
      password,
    })
      .catch((error) => {
        // TODO: error feedback
      })
      .finally(() => setFetching(false));
  };

  const onGoToSignUp = () => {
    setMode("signup");
  };

  const onGoToSignIn = () => {
    setMode("signin");
  };

  const onSignUp = (
    firstName: string,
    lastName: string,
    email: string,
    emailAgain: string,
    password: string,
    passwordAgain: string
  ) => {
    setFetching(true);
    signUp({
      firstName,
      lastName,
      email,
      emailAgain,
      password,
      passwordAgain,
    })
      .then(() => {
        setMode("signin");
        setSuccessMessage(
          "Your account has been created. Sign in to continue."
        );
      })
      .catch((error: AxiosError<{ message: string }>) => {
        const message = error.response?.data.message || error.message;
        setErrorMessage(message);
      })
      .finally(() => setFetching(false));
  };

  const onGoogleLoginClick = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
      setFetching(true);
      googleSign(access_token).finally(() => {
        setFetching(false);
      });
      // TODO: catch Google sign error
    },
  });

  const onPasswordRecovery = (email: string) => {
    passwordRecovery(email).then(() => {
      setSuccessMessage("Check your e-mail for the password recovery link.");
    });
  };

  return (
    <>
      <Dialog
        open={show}
        onClose={closeDialog}
        maxWidth="xs"
      >
        <DialogTitle textAlign="center">
          {mode === "signin"
            ? "Sign In"
            : mode === "signup"
            ? "Sign Up"
            : "Recover Password"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {errorMessage ? (
              <Alert
                severity="error"
                sx={{ mb: 2 }}
              >
                {errorMessage}
              </Alert>
            ) : null}
            {mode === "signin" && successMessage ? (
              <Alert
                severity="success"
                sx={{ mb: 2 }}
              >
                {successMessage}
              </Alert>
            ) : null}
            {mode === "signin" ? (
              <SignInForm
                onSubmit={onSignIn}
                onToggleMode={onGoToSignUp}
                fetching={fetching}
              />
            ) : mode === "signup" ? (
              <SignUpForm
                onSubmit={onSignUp}
                onToggleMode={onGoToSignIn}
                fetching={fetching}
              />
            ) : (
              <RecoverPasswordForm
                onSubmit={onPasswordRecovery}
                onGoBack={onGoToSignIn}
              />
            )}
          </Box>

          {mode !== "forgot-password" ? (
            <>
              <Divider sx={{ my: 3 }}>OR</Divider>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => onGoogleLoginClick()}
                disabled={fetching}
              >
                <img
                  src={gLogo}
                  alt="google-signin-logo"
                  style={{ height: "80%", marginRight: "8px" }}
                />
                Sign In with Google
              </Button>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Link
                  onClick={onForgotPasswordClick}
                  href="#"
                  underline="hover"
                  textAlign="center"
                >
                  Forgot password?
                </Link>
              </Box>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
