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
    console.log("useEffect", currentUser);
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
                <h1>Private Routes</h1>
                <button
                  type="button"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </>
            }
          />
        ) : null}
      </Routes>
    </>
  );
}
