import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

type RecoverPasswordFormProps = {
  onSubmit: (email: string) => void;
  onGoBack: () => void;
};

export default function RecoverPasswordForm({
  onSubmit,
  onGoBack,
}: RecoverPasswordFormProps) {
  const [email, setEmail] = useState("");

  return (
    <>
      <Typography
        variant="body1"
        sx={{ mb: 2 }}
      >
        Type your e-mail address. If it is registered, we'll send you a recovery
        link.
      </Typography>
      <TextField
        label="E-mail"
        type="email"
        autoFocus
        fullWidth
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        sx={{ mb: 3 }}
      />
      <Button
        fullWidth
        disableElevation
        variant="contained"
        onClick={() => onSubmit(email)}
        sx={{ mb: 1 }}
      >
        Recover
      </Button>
      <Button
        fullWidth
        disableElevation
        variant="contained"
        color="secondary"
        onClick={() => onGoBack()}
      >
        Go Back
      </Button>
    </>
  );
}
