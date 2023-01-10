import { Button, Typography } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth } from "../features/common/hooks/useAuth";

export default function PublicRoutes() {
  const { signIn } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Typography variant="h3">Public Routes</Typography>
              <Button
                disableElevation
                variant="contained"
                onClick={() =>
                  signIn({
                    email: "murilohenriquematias@gmail.com",
                    password: "Murilo#321",
                  })
                }
              >
                Sign In
              </Button>
            </>
          }
        />
      </Routes>
    </>
  );
}
