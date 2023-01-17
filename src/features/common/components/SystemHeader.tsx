import { Avatar, Box, Button, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store";
import { fetchMe } from "../api/fetchMe";
import { useAuth } from "../hooks/useAuth";
import Logo from "../assets/logo.svg";
import LogoIcon from "../assets/logo-icon.svg";
import { useLocation, useParams } from "react-router-dom";

export const SYSTEM_HEADER_HEIGHTS = { xs: "56px", sm: "80px", md: "80px" };

type SystemHeaderProps = {
  selectedTab: string;
  onTabChange: (value: string) => void;
};

export default function SystemHeader(props: SystemHeaderProps) {
  const { signOut } = useAuth();
  const currentUser = useAppSelector((state) => state.common.currentUser);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: SYSTEM_HEADER_HEIGHTS,
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          px: { xs: 3, md: 8 },
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          aligItems: "center",
          backdropFilter: "blur(14px)",
          zIndex: 1,
        }}
      >
        <Grid
          container
          maxWidth="xl"
        >
          {/* TABLET/DESKTOP LOGO */}
          <Grid
            item
            xs={4}
            md={6}
            lg={7}
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={Logo}
              alt="Limestone"
            />
          </Grid>
          {/* END TABLET/DESKTOP LOGO */}
          {/* PHONE LOGO */}
          <Grid
            item
            xs={4}
            md={6}
            lg={7}
            sx={{
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={LogoIcon}
              alt="Limestone"
              style={{ width: "32px" }}
            />
          </Grid>
          {/* END PHONE LOGO */}
          <Grid
            item
            xs={8}
            md={6}
            lg={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Tabs
              value={props.selectedTab}
              sx={{
                height: "100%",
                mr: 2,
                ".MuiTabs-scroller": { display: "flex", alignItems: "center" },
              }}
              onChange={(event, newValue) => props.onTabChange(newValue)}
            >
              <Tab
                label="Boards"
                value="boards"
              />
              <Tab
                label="People"
                value="people"
              />
            </Tabs>
            <Avatar>MH</Avatar>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
