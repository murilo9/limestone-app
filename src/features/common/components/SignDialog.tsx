import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
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

type SignDialogProps = {
  show: boolean;
  onClose: () => void;
};

export default function SignDialog({ show, onClose }: SignDialogProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signUpDone, setSignUpDone] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { signIn, googleSign } = useAuth();

  const closeDialog = () => {
    setMode("signin");
    setSignUpDone(false);
    onClose();
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
      .catch((error) => {
        // TODO: error feedback
      })
      .then(() => {
        setMode("signin");
        setSignUpDone(true);
      })
      .finally(() => setFetching(false));
  };

  const onGoogleLoginClick = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const { access_token } = tokenResponse;
      googleSign(access_token);
      // TODO: catch Google sign error
    },
  });

  return (
    <>
      <Dialog
        open={show}
        onClose={closeDialog}
        maxWidth="xs"
      >
        <DialogTitle textAlign="center">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {mode === "signin" && signUpDone ? (
              <Alert
                color="success"
                sx={{ mb: 2 }}
              >
                Your account has been created. Sign in to continue.
              </Alert>
            ) : null}
            {mode === "signin" ? (
              <SignInForm
                onSubmit={onSignIn}
                onToggleMode={onGoToSignUp}
                fetching={fetching}
              />
            ) : (
              <SignUpForm
                onSubmit={onSignUp}
                onToggleMode={onGoToSignIn}
                fetching={fetching}
              />
            )}
          </Box>
          <Divider sx={{ my: 3 }}>OR</Divider>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => onGoogleLoginClick()}
          >
            <img
              src={gLogo}
              alt="google-signin-logo"
              style={{ height: "80%", marginRight: "8px" }}
            />
            Sign In with Google
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
