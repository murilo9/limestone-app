import { Typography, Button } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardsPage from "../features/boards/routes/boards";
import { fetchMe } from "../features/common/api/fetchMe";
import { fetchCurrentUser } from "../features/common/commonSlice";
import { useAuth } from "../features/common/hooks/useAuth";
import SystemPage from "../features/common/routes/system";
import PeoplePage from "../features/users/routes/people";
import { onFetchUsers } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../store";

export default function PrivateRoutes() {
  const currentUser = useAppSelector((state) => state.common.currentUser);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const init = async () => {
      if (!currentUser) {
        await dispatch(fetchCurrentUser());
        await dispatch(onFetchUsers());
      }
    };
    init();
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
              path="*"
              element={
                <Navigate
                  to="/"
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
