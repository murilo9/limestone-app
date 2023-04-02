import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const upcomingFeaturesList = [
  {
    title: "Profile pictures",
    subtitle: "Let users have profile pictures in their avatars.",
  },
  {
    title: "Non-admin Google signup",
    subtitle: "Let all users (not only admins) sign up/in with Google.",
  },
  {
    title: "Notifications",
    subtitle: "Be notified about things happening on your boards/cards.",
  },
  {
    title: "Internationalization",
    subtitle: "Use the platform in your native language.",
  },
];

export default function LandingUpcomingFeatures() {
  return upcomingFeaturesList.length ? (
    <>
      <Box
        sx={{
          mx: { xs: -3, md: -8 },
          px: { xs: 5, sm: 0 },
          py: "96px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: "64px" }}
        >
          Upcoming Features
        </Typography>
        <Grid
          container
          sx={{
            width: { sm: "90%", lg: "70%" },
            display: "inline-flex",
          }}
          spacing={6}
        >
          {upcomingFeaturesList.map((feature) => (
            <>
              <Grid
                item
                xs={12}
                sm={4}
              >
                <Typography
                  variant="h6"
                  color="black"
                  sx={{ mb: 1 }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="#666666"
                >
                  {feature.subtitle}
                </Typography>
              </Grid>
            </>
          ))}
        </Grid>
      </Box>
    </>
  ) : null;
}
