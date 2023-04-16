import { Typography, Button } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardDetailsPage from "../features/boards/routes/board-details";
import BoardsPage from "../features/boards/routes/boards";
import { fetchMe } from "../features/common/api/fetchMe";
import { useAuth } from "../features/common/hooks/useAuth";
import SettingsPage from "../features/common/routes/settings";
import SystemPage from "../features/common/routes/system";
import PeoplePage from "../features/users/routes/people";
import {
  onFetchLoggedUserData,
  onFetchUsers,
} from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../store";

export default function PrivateRoutes() {
  const currentUser = useAppSelector((state) => state.users.loggedUser);
  const dispatch = useAppDispatch();
  const { signOut } = useAuth();

  useLayoutEffect(() => {
    const init = async () => {
      if (!currentUser) {
        await dispatch(onFetchLoggedUserData()).catch((error) => {
          if (error.code === "ERR_BAD_REQUEST") {
            signOut();
          }
        });
        await dispatch(onFetchUsers());
      }
    };
    init();
  }, [currentUser]);

  return (
    <>
      <Routes>
        {currentUser ? (
          <>
            <Route
              path="/"
              element={<SystemPage />}
            >
              <Route
                path="/boards/:boardId"
                element={<BoardDetailsPage />}
              />
              <Route
                path="/boards"
                element={<BoardsPage />}
              />
              <Route
                path="/people"
                element={<PeoplePage />}
              />
              <Route
                path="/settings"
                element={<SettingsPage />}
              />
              <Route
                path="/"
                element={
                  <Navigate
                    to="/boards"
                    replace={true}
                  />
                }
              />
            </Route>
          </>
        ) : null}
      </Routes>
    </>
  );
}
