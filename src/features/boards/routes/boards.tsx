import {
  AddCircle,
  Filter,
  FilterAltOutlined,
  Search,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import BoardsHeader, {
  BOARDS_HEADER_HEIGHTS,
} from "../components/BoardsHeader";

export default function BoardsPage() {
  const theme = useTheme();

  return (
    <>
      <Box
        className="lim-boards-page"
        sx={{
          px: "0 !important",
          margin: "auto",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <BoardsHeader />
        <Box
          className="lim-boards-list"
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            boxSizing: "border-box",
            pt: BOARDS_HEADER_HEIGHTS,
          }}
        >
          <Typography variant="h1">Boards</Typography>
          <Box sx={{ height: "1000px" }}></Box>
        </Box>
      </Box>
    </>
  );
}
