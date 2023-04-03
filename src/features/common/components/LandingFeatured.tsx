import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import connectionSvg from "../assets/connection.svg";
import notificationSvg from "../assets/notification.svg";
import stepsSvg from "../assets/steps.svg";

export default function LandingFeatured() {
  return (
    <>
      <Box
        id="featured"
        sx={{
          bgcolor: "#F5F8F7",
          mx: { xs: -3, md: -8 },
          px: { xs: 5, sm: 0 },
          py: "96px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          sx={{
            width: { sm: "90%", lg: "70%" },
            display: "inline-flex",
          }}
          spacing={6}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={stepsSvg}
              alt="Steps"
              style={{ width: "128px" }}
            />
            <Typography
              variant="h5"
              color="black"
              textAlign="center"
              sx={{ mt: 4 }}
            >
              Manage work effectively assigning priorities to cards.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={notificationSvg}
              alt="Notification"
              style={{ width: "128px" }}
            />
            <Typography
              variant="h5"
              color="black"
              textAlign="center"
              sx={{ mt: 4 }}
            >
              Stay up to date with progress with in-mail notifications. You
              control exactly what feedback you wish receive.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={connectionSvg}
              alt="Connection"
              style={{ width: "128px" }}
            />
            <Typography
              variant="h5"
              color="black"
              textAlign="center"
              sx={{ mt: 4 }}
            >
              Define which people have access to each board, as well as what
              exactly each one can do.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
