import React, { useEffect } from "react";
import { useAuth } from "../features/common/hooks/useAuth";
import { onFetchCurrentUserData } from "../features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "../store";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

export default function RoutesProvider() {
  const dispatch = useAppDispatch();
  const { access_token } = useAuth();
  const currentUser = useAppSelector((state) => state.users.currentUser);

  useEffect(() => {
    if (access_token && !currentUser) {
      dispatch(onFetchCurrentUserData());
      // TODO: handle fetch error
    }
  }, [access_token, currentUser, dispatch]);

  return (
    <>
      {access_token ? (
        currentUser ? (
          <PrivateRoutes></PrivateRoutes>
        ) : null
      ) : (
        <PublicRoutes></PublicRoutes>
      )}
    </>
  );
}
