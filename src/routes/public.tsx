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
              <h1>Public Routes</h1>
              <button
                type="button"
                onClick={() =>
                  signIn({
                    email: "murilohenriquematias@gmail.com",
                    password: "Murilo#321",
                  })
                }
              >
                Sign In
              </button>
            </>
          }
        />
      </Routes>
    </>
  );
}
