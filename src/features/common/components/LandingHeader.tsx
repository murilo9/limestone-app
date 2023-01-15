import { Language } from "@mui/icons-material";
import { Box, Button, Container, Grid, MenuItem, Select } from "@mui/material";
import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import { useAuth } from "../hooks/useAuth";

const localeDictionary: { [key: string]: string } = {
  en: "English",
  "pt-BR": "Português",
};

export default function LandingHeader() {
  const [locale, setLocale] = useState("en");
  const { signIn } = useAuth();

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: { xs: "56px", sm: "80px", md: "80px" },
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
            <Select
              size="small"
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
              renderValue={(value) => (
                <>
                  <Box sx={{ display: "flex" }}>
                    <Language />
                    <Box sx={{ ml: 1, display: { xs: "none", sm: "inline" } }}>
                      {localeDictionary[value]}
                    </Box>
                  </Box>
                </>
              )}
              sx={{ mr: 2, width: { xs: "auto", sm: "170px" } }}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="pt-BR">Portugês</MenuItem>
            </Select>
            <Button sx={{ display: { xs: "none", md: "block" } }}>
              Learn more
            </Button>
            <Button sx={{ display: { xs: "none", md: "block" } }}>
              Github
            </Button>
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
      </Box>
    </>
  );
}
