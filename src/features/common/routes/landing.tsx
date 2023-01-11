import { Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { signIn } from "../api/signIn";
import LandingHeader from "../components/LandingHeader";

const PHONE_HEADER_HEIGHT = "56px";
const TABLET_HEADER_HEIGHT = "80px";
const DESKTOP_HEADER_HEIGHT = "80px";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />
      <Container
        sx={{
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          pt: {
            xs: PHONE_HEADER_HEIGHT,
            sm: TABLET_HEADER_HEIGHT,
            md: DESKTOP_HEADER_HEIGHT,
          },
        }}
      ></Container>
    </>
  );
}
