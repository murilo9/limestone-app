import React from "react";
import { Route, Routes } from "react-router-dom";

export default function PrivateRoutes() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<>Private Routes</>}
        />
      </Routes>
    </>
  );
}
