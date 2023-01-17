import {
  AddCircle,
  Filter,
  FilterAltOutlined,
  Search,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import BoardsHeader from "../components/BoardsHeader";

export default function BoardsPage() {
  const theme = useTheme();

  return (
    <>
      <Grid
        className="lim-boards-page"
        container
        maxWidth="xl"
        sx={{ px: "0 !important", margin: "auto", py: 5 }}
      >
        <BoardsHeader />
      </Grid>
    </>
  );
}
