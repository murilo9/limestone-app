import { Typography, Button, Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { signIn } from "../api/signIn";
import LandingHeader from "../components/LandingHeader";
import landingBkg from "../assets/landing-bkg.png";
import LandingStart from "../components/LandingStart";
import LandingTutorial from "../components/LandingTutorial";
import LandingFeatured from "../components/LandingFeatured";
import LandingUpcomingFeatures from "../components/LandingUpcomingFeatures";
import LandingFooter from "../components/LandingFooter";

const PHONE_HEADER_HEIGHT = "56px";
const TABLET_HEADER_HEIGHT = "80px";
const DESKTOP_HEADER_HEIGHT = "80px";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <Box
        sx={{
          position: "relative",
          boxSizing: "border-box",
          height: "100vh",
          width: "100vw",
          overflowY: "auto",
          overflowX: "hidden",
          px: { xs: 3, md: 8 },
          pt: {
            xs: PHONE_HEADER_HEIGHT,
            sm: TABLET_HEADER_HEIGHT,
            md: DESKTOP_HEADER_HEIGHT,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: { xs: "-20%", md: 0 },
            top: { xs: "100%", md: 0 },
            width: { xs: "120vw", md: "100vw" },
            zIndex: -1,
            transform: {
              xs: "scale3d(-1, -2, 1)",
              sm: "scale3d(-1, -1, 1)",
              md: "scaleY(1)",
              lg: "scaleY(0.7)",
            },
          }}
        >
          <img
            src={landingBkg}
            alt=""
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              width: "100%",
            }}
          />
        </Box>
        <Grid
          container
          maxWidth="lg"
          sx={{
            margin: "auto",
            height: {
              xs: `calc(100vh - ${PHONE_HEADER_HEIGHT})`,
              sm: `calc(100vh - ${TABLET_HEADER_HEIGHT})`,
              md: `calc(100vh - ${DESKTOP_HEADER_HEIGHT})`,
            },
            px: { xs: 4, md: 0 },
          }}
        >
          <LandingStart />
        </Grid>
        <LandingTutorial />
        <LandingFeatured />
        <LandingUpcomingFeatures />
        <LandingFooter />
      </Box>
    </>
  );
}
