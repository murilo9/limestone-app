import { Container, Grid, Typography } from "@mui/material";
import React from "react";

export default function PeoplePage() {
  return (
    <>
      <Grid
        container
        maxWidth="xl"
        sx={{
          px: "0 !important",
          height: /* TO BE REMOVED */ "2000px",
          margin: "auto",
        }}
      >
        <Typography variant="h1">People Page</Typography>
      </Grid>
    </>
  );
}
