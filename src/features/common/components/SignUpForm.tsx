import { Box, Button, Link, TextField } from "@mui/material";
import React, { KeyboardEventHandler, useState } from "react";

type SignUpFormProps = {
  onSubmit: (
    firstName: string,
    lastName: string,
    email: string,
    emailAgain: string,
    password: string,
    passwordAgain: string
  ) => void;
  onToggleMode: () => void;
  fetching: boolean;
};

export default function SignUpForm({
  onSubmit,
  onToggleMode,
  fetching,
}: SignUpFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailAgain, setEmailAgain] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const onSignInClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    onToggleMode();
  };

  const onSubmitClick = () => {
    onSubmit(firstName, lastName, email, emailAgain, password, passwordAgain);
  };

  const handlePasswordAgainInputKeyPress: KeyboardEventHandler<
    HTMLDivElement
  > = (event) => {
    if (event.key === "Enter") {
      onSubmitClick();
    }
  };

  return (
    <>
      {/* TODO: implement fields validation */}
      <TextField
        label="First name"
        fullWidth
        sx={{ mt: 2 }}
        autoFocus
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        label="LastName"
        fullWidth
        sx={{ mt: 2 }}
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
      />
      <TextField
        label="E-mail"
        type="email"
        fullWidth
        sx={{ mt: 2 }}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Repeat e-mail"
        fullWidth
        sx={{ mt: 2 }}
        value={emailAgain}
        onChange={(event) => setEmailAgain(event.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        label="Repeat password"
        type="password"
        fullWidth
        sx={{ mt: 2 }}
        value={passwordAgain}
        onChange={(event) => setPasswordAgain(event.target.value)}
        onKeyUp={handlePasswordAgainInputKeyPress}
      />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          onClick={onSignInClick}
          href="#"
          underline="hover"
        >
          Already have an account? Sign In
        </Link>
        <Button
          variant="contained"
          disableElevation
          fullWidth
          sx={{
            mt: 3,
            px: { xs: 0, sm: 4 },
          }}
          onClick={onSubmitClick}
          disabled={fetching}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}
