import { Button, Typography } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../features/common/hooks/useAuth";
import LandingPage from "../features/common/routes/landing";
import SignInPage from "../features/common/routes/signIn";

export default function PublicRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route
          path="/signin"
          element={<SignInPage />}
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
