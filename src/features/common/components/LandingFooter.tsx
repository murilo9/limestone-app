import { Box, Link, Typography } from "@mui/material";
import React from "react";
import LocaleSelect from "./LocaleSelect";

export default function LandingFooter() {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#5A7E90",
          width: "100vw",
          boxSizing: "border-box",
          py: 8,
          px: 8,
          mx: { xs: -3, md: -8 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <LocaleSelect
          sx={{
            color: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(228, 219, 233, 0.25)",
            },
            ".MuiSvgIcon-root ": {
              fill: "white !important",
            },
          }}
        />
        <Link
          href="https://github.com/murilo9/limestone-app"
          underline="hover"
          color="white"
          target="_blank"
          sx={{ mt: 3 }}
        >
          Github
        </Link>
        <Link
          href="https://www.flaticon.com/authors/surang"
          title="connection icons"
          underline="hover"
          color="white"
          target="_blank"
          sx={{ mt: 3 }}
        >
          Some icons created by surang - Flaticon
        </Link>
        <Typography
          color="white"
          sx={{ mt: 3 }}
        >
          Limestone - 2023
        </Typography>
        <Typography
          variant="caption"
          color="white"
        >
          No rights reserved
        </Typography>
      </Box>
    </>
  );
}
