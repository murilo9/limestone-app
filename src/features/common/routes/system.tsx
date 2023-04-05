import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { onLoadAllBoards } from "../../boards/boardsSlice";
import BoardPeopleModal from "../../boards/components/BoardPeopleModal";
import CreateBoardModal from "../../boards/components/CreateBoardModal";
import BoardsPage from "../../boards/routes/boards";
import CardDetailsModal from "../../cards/components/CardDetailsModal";
import CreateCardModal from "../../cards/components/CreateCardModal";
import { onLoadColumns } from "../../columns/columnsSlice";
import CreateUserModal from "../../users/components/CreateUserModal";
import UserDetailsModal from "../../users/components/UserDetailsModal";
import PeoplePage from "../../users/routes/people";
import { onFetchUsers } from "../../users/usersSlice";
import ConfirmationDialog from "../components/ConfirmationDialog";
import SystemHeader, {
  SYSTEM_HEADER_HEIGHTS,
} from "../components/SystemHeader";
import ToastNotification from "../components/ToastNotification";
import { SystemTabs } from "../types/SystemTabs";

const getSelectedTab = (value: string) => {
  switch (value) {
    case SystemTabs.BOARDS:
    case SystemTabs.PEOPLE:
      return value;
    default:
      return null;
  }
};

export default function SystemPage() {
  const params = useLocation();
  const pathName = params.pathname.split("/")[1];
  const selectedTab = getSelectedTab(pathName);
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.entities);
  const users = useAppSelector((state) => state.users.entities);
  const [loadingAppData, setLoadingAppData] = useState(true);
  const [loadAppDataError, setLoadAppDatError] = useState(false);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        await dispatch(onLoadAllBoards());
        await dispatch(onFetchUsers());
      } catch (error) {
        console.log(error);
        setLoadAppDatError(true);
        // TODO: show error on load app data view
      } finally {
        setLoadingAppData(false);
      }
    };
    loadAppData();
  }, []);

  return (
    <>
      {loadingAppData ? null : loadAppDataError ? (
        "Error loading app data"
      ) : (
        <>
          <SystemHeader selectedTab={selectedTab} />
          <Box
            className="lim-system-container"
            sx={{
              position: "relative",
              boxSizing: "border-box",
              height: "100vh",
              width: "100vw",
              overflowY: "hidden",
              overflowX: "hidden",
              pt: SYSTEM_HEADER_HEIGHTS,
            }}
          >
            <Outlet />
          </Box>

          {/* Here lies all global-level modals */}
          <CreateUserModal />
          <CreateBoardModal />
          <CreateCardModal />
          <ConfirmationDialog />
          <CardDetailsModal />
          <UserDetailsModal />
          <ToastNotification />
          <BoardPeopleModal />
          {/*-----------------------------------*/}
        </>
      )}
    </>
  );
}
