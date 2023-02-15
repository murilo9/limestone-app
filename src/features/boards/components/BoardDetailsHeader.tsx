import { FilterAltOutlined, AddCircle, Search } from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  Box,
  Switch,
  Avatar,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { SYSTEM_HEADER_PADDINGS } from "../../common/components/SystemHeader";
import { BoardEntity } from "../types/BoardEntity";
import Board from "./Board";

export const BOARDS_HEADER_HEIGHTS = { xs: "120px", md: "56px" };

type BoardDetailsHeaderProps = {
  boardTitle: string;
  editColumnsMode: boolean;
  setEditColumnsMode: (value: boolean) => void;
};

export default function BoardDetailsHeader({
  boardTitle,
  editColumnsMode,
  setEditColumnsMode,
}: BoardDetailsHeaderProps) {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        maxWidth="xl"
        sx={{
          mx: 0,
          mb: 6,
        }}
      >
        <Grid
          item
          xs={0}
          md={4}
        >
          <Typography
            variant="h5"
            color="black"
            fontWeight={300}
            display="inline"
          >
            {boardTitle}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          md={4}
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
          xs={6}
          md={4}
          sx={{
            display: "flex",
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
        </Grid>

        <Grid
          item
          xs={4}
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box>
            <Switch
              size="small"
              value={editColumnsMode}
              onChange={(event) => setEditColumnsMode(event.target.checked)}
            />
            <Typography
              variant="body2"
              sx={{ display: "inline-block" }}
            >
              Edit columns
            </Typography>
          </Box>
          <Box sx={{ ml: 4 }}>
            {[0, 1, 2].map((user) => (
              <Avatar sx={{ display: "inline-flex" }}>JD</Avatar>
            ))}
          </Box>
        </Grid>
        {/* <Board /> */}
      </Grid>
    </>
  );
}
