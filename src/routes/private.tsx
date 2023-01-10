import { Typography, Button } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchCurrentUser } from "../features/common/commonSlice";
import { useAuth } from "../features/common/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../store";

export default function PrivateRoutes() {
  const { signOut } = useAuth();
  const currentUser = useAppSelector((state) => state.common.currentUser);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [currentUser]);

  return (
    <>
      <Routes>
        {currentUser ? (
          <Route
            path="/"
            element={
              <>
                <Typography variant="h3">Private Routes</Typography>
                <Button
                  disableElevation
                  variant="contained"
                  onClick={signOut}
                >
                  Sign Out
                </Button>
              </>
            }
          />
        ) : null}
      </Routes>
    </>
  );
}
