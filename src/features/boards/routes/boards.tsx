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
import BoardsHeader from "../components/BoardsHeader";

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
        }}
      >
        <BoardsHeader />
      </Box>
    </>
  );
}
