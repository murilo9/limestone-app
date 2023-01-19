import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BoardsPage from "../../boards/routes/boards";
import PeoplePage from "../../users/routes/people";
import SystemHeader, {
  SYSTEM_HEADER_HEIGHTS,
} from "../components/SystemHeader";

enum TABS {
  BOARDS = "boards",
  PEOPLE = "people",
}

const getSelectedTab = (value: string) => {
  switch (value) {
    case "boards":
    case "people":
      return value;
    default:
      return "boards";
  }
};

export default function SystemPage() {
  const params = useLocation();
  const pathName = params.pathname.split("/")[1];
  const [selectedTab, setSelectedTab] = useState(getSelectedTab(pathName));

  const handleTabChange = (newTab: string) => {
    window.history.replaceState(null, "Liquid Pass", `/${newTab}`);
    setSelectedTab(getSelectedTab(newTab));
  };

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case "boards":
        return <BoardsPage />;
      case "people":
        return <PeoplePage />;
    }
  };

  return (
    <>
      <SystemHeader
        selectedTab={selectedTab}
        onTabChange={handleTabChange}
      />
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
        {renderSelectedTab()}
      </Box>
    </>
  );
}
