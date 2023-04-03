import { Language } from "@mui/icons-material";
import { Box, Button, Container, Grid, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";
import LocaleSelect from "./LocaleSelect";
import SignDialog from "./SignDialog";

type LandingHeaderProps = {
  onOpenSignDialog: () => void;
};

export default function LandingHeader({
  onOpenSignDialog,
}: LandingHeaderProps) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: { xs: "64px", sm: "80px", md: "80px" },
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
          maxWidth="lg"
        >
          <Grid
            item
            xs={4}
            md={6}
            lg={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <img
              src={Logo}
              alt="Limestone"
            />
          </Grid>
          <Grid
            item
            xs={8}
            md={6}
            lg={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-end", md: "space-between" },
            }}
          >
            <LocaleSelect sx={{ mr: 2, width: { xs: "auto", sm: "170px" } }} />
            <Button
              sx={{ display: { xs: "none", md: "block" } }}
              href="#learn"
            >
              Learn more
            </Button>
            <Button
              sx={{ display: { xs: "none", md: "block" } }}
              href="https://github.com/murilo9/limestone-app"
            >
              Github
            </Button>
            <Button
              disableElevation
              variant="contained"
              onClick={onOpenSignDialog}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
