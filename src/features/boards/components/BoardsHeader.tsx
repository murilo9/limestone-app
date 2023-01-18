import { FilterAltOutlined, AddCircle, Search } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import React from "react";
import { SYSTEM_HEADER_PADDINGS } from "../../common/components/SystemHeader";

export default function BoardsHeader() {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{ width: "100%", position: "absolute", top: 0, left: 0, right: 0 }}
      >
        <Grid
          container
          maxWidth="xl"
          sx={{
            margin: "auto",
            px: SYSTEM_HEADER_PADDINGS,
          }}
        >
          <Grid
            item
            xs={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              color="#000000"
              fontWeight={300}
            >
              Boards
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color="primary"
              sx={{ pr: 0 }}
            >
              <AddCircle sx={{ fontSize: "40px" }} />
            </IconButton>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 3, md: 0 },
            }}
          >
            <TextField
              placeholder="Search"
              variant="standard"
              sx={{ width: { xs: "100%", md: "auto" } }}
              InputProps={{
                endAdornment: (
                  <Search sx={{ color: theme.palette.text.disabled }} />
                ),
                sx: {
                  px: 2,
                },
              }}
            />
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              sx={{ ml: 4, display: { xs: "none", md: "flex" } }}
              startIcon={<FilterAltOutlined />}
            >
              Filters
            </Button>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color="primary"
              sx={{ pr: 0 }}
            >
              <AddCircle sx={{ fontSize: "40px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
