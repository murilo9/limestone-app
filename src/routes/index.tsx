import React, { useEffect } from "react";
import { useAuth } from "../features/common/hooks/useAuth";
import { onFetchLoggedUserData } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../store";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

export default function RoutesProvider() {
  const { access_token } = useAuth();

  return (
    <>
      {access_token ? (
        <PrivateRoutes></PrivateRoutes>
      ) : (
        <PublicRoutes></PublicRoutes>
      )}
    </>
  );
}
