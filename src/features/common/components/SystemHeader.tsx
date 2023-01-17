import { Box, Button } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store";
import { fetchMe } from "../api/fetchMe";
import { useAuth } from "../hooks/useAuth";

export default function SystemHeader() {
  const { signOut } = useAuth();
  const currentUser = useAppSelector((state) => state.common.currentUser);

  return (
    <>
      <Box>
        <Button
          disableElevation
          variant="contained"
          onClick={signOut}
        >
          Sign Out
        </Button>
        <Button
          disableElevation
          variant="contained"
          onClick={() => fetchMe()}
        >
          Fetch
        </Button>
        {currentUser
          ? Object.keys(currentUser).map((key) => (
              <p>{`${key}: ${(currentUser as any)[key]}`}</p>
            ))
          : null}
      </Box>
    </>
  );
}
