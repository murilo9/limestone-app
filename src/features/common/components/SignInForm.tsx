import { Box, Button, Link, TextField } from "@mui/material";
import React, { KeyboardEventHandler, useState } from "react";

type SignInFormProps = {
  onSubmit: (email: string, password: string) => void;
  onToggleMode: () => void;
  fetching: boolean;
};

export default function SignInForm({
  onSubmit,
  onToggleMode,
  fetching,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignUpClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    onToggleMode();
  };

  const onSubmitClick = () => {
    onSubmit(email, password);
  };

  const handlePasswordInputKeyPress: KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      onSubmitClick();
    }
  };

  return (
    <>
      <TextField
        label="E-mail"
        type="email"
        autoFocus
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        sx={{ mt: 2 }}
        onKeyUp={handlePasswordInputKeyPress}
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
          onClick={onSignUpClick}
          href="#"
          underline="hover"
        >
          Don't have an account? Sign Up
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
          Sign In
        </Button>
      </Box>
    </>
  );
}
