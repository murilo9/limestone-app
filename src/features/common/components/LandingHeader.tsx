import { Button, Grid } from "@mui/material";
import React from "react";
import { signIn } from "../api/signIn";
import Logo from "../assets/logo.svg";

export default function LandingHeader() {
  return (
    <>
      <Grid
        container
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: { xs: "56px", sm: "80px", md: "80px" },
          borderBottom: "1px solid rgba(0,0,0,0.2)",
          px: { xs: 3, md: 8 },
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img src={Logo} />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            disableElevation
            variant="contained"
            onClick={() =>
              signIn({
                email: "murilohenriquematias@gmail.com",
                password: "Murilo#321",
              })
            }
          >
            Sign In
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
