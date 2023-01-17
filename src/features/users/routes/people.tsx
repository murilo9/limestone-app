import { Container, Typography } from "@mui/material";
import React from "react";

export default function PeoplePage() {
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{ px: "0 !important", height: /* TO BE REMOVED */ "2000px" }}
      >
        <Typography variant="h1">People Page</Typography>
      </Container>
    </>
  );
}
