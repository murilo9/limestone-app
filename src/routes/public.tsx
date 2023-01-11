import { Button, Typography } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../features/common/hooks/useAuth";
import LandingPage from "../features/common/routes/landing";

export default function PublicRoutes() {
  const { signIn } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </>
  );
}
