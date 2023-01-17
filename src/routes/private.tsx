import { Typography, Button } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardsPage from "../features/boards/routes/boards";
import { fetchMe } from "../features/common/api/fetchMe";
import { fetchCurrentUser } from "../features/common/commonSlice";
import { useAuth } from "../features/common/hooks/useAuth";
import SystemPage from "../features/common/routes/system";
import PeoplePage from "../features/users/routes/people";
import { useAppDispatch, useAppSelector } from "../store";

export default function PrivateRoutes() {
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
            element={<SystemPage />}
          >
            <Route
              index
              element={<Navigate to="/boards" />}
            />
            <Route
              path="/boards"
              element={<BoardsPage />}
            />
            <Route
              path="/boards/:boardId"
              element={<BoardsPage />}
            />
            <Route
              path="/boards/:boardId/:cardId"
              element={<BoardsPage />}
            />
            <Route
              path="/people"
              element={<PeoplePage />}
            />
            <Route
              path="*"
              element={
                <Navigate
                  to="/boards"
                  replace={true}
                />
              }
            />
          </Route>
        ) : null}
      </Routes>
    </>
  );
}
