import { FilterAltOutlined, AddCircle, Search } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
} from "@mui/material";
import React from "react";

export default function BoardsHeader() {
  const theme = useTheme();

  return (
    <>
      <Grid container>
        <Grid
          item
          xs={3}
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search"
            variant="standard"
            sx={{}}
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
            sx={{ ml: 4 }}
            startIcon={<FilterAltOutlined />}
          >
            Filters
          </Button>
        </Grid>
        <Grid
          item
          xs={3}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton color="primary">
            <AddCircle sx={{ fontSize: "40px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
