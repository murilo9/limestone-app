import React from "react";
import { useAuth } from "../features/common/hooks/useAuth";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

export default function RoutesProvider() {
  const auth = useAuth();

  return (
    <>
      {auth.access_token ? (
        <PrivateRoutes></PrivateRoutes>
      ) : (
        <PublicRoutes></PublicRoutes>
      )}
    </>
  );
}
