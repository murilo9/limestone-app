import { Box, Button, Grid, Typography } from "@mui/material";
import printPhone from "../assets/print-phone.png";
import printDesktop from "../assets/print-desktop.png";
import React from "react";

export default function LandingStart() {
  return (
    <>
      {/* DESKTOP HEADING */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "44px", mb: 8 }}
        >
          Because the <b style={{ fontWeight: 600 }}>complex</b> can be managed{" "}
          <b style={{ fontWeight: 600 }}>smiply</b> :{")"}
        </Typography>
        <Box>
          <Button
            variant="contained"
            disableElevation
          >
            Start Now
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2 }}
          >
            Get Insights
          </Button>
        </Box>
      </Grid>
      {/* END - DESKTOP HEADING */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          px: { sm: 6, md: 0 },
        }}
      >
        <img
          src={printPhone}
          alt=""
          style={{
            width: "30%",
            boxShadow: "8px 8px 20px 10px rgba(0, 0, 0, 0.25)",
            position: "relative",
            left: "32px",
            zIndex: -1,
          }}
        />
        <img
          src={printDesktop}
          alt=""
          style={{
            width: "70%",
            boxShadow: "8px 8px 20px 10px rgba(0, 0, 0, 0.25)",
          }}
        />
      </Grid>
      {/* PHONE & TABLET HEADING */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontSize: "38px", mb: 6 }}
        >
          Because the <b style={{ fontWeight: 600 }}>complex</b> can be managed{" "}
          <b style={{ fontWeight: 600 }}>smiply</b> :{")"}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            disableElevation
          >
            Start Now
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 3, sm: 0 } }}
          >
            Get Insights
          </Button>
        </Box>
      </Grid>
      {/* END - PHONE & TABLET HEADING */}
    </>
  );
}
