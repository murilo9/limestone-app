import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CreateBoardModal from "../../boards/components/CreateBoardModal";
import BoardsPage from "../../boards/routes/boards";
import CardDetailsModal from "../../cards/components/CardDetailsModal";
import CreateCardModal from "../../cards/components/CreateCardModal";
import PeoplePage from "../../users/routes/people";
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

  return (
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
      <CreateBoardModal />
      <CreateCardModal />
      <ConfirmationDialog />
      <CardDetailsModal />
      <ToastNotification />
      {/*-----------------------------------*/}
    </>
  );
}
