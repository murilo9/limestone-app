import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BoardsPage from "../../boards/routes/boards";
import PeoplePage from "../../users/routes/people";
import SystemHeader, {
  SYSTEM_HEADER_HEIGHTS,
} from "../components/SystemHeader";
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
    </>
  );
}
