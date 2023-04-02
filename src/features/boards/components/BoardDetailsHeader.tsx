import {
  FilterAltOutlined,
  AddCircle,
  Search,
  Close,
} from "@mui/icons-material";
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
import { UserEntity } from "../../users/types/User";
import { BoardEntity } from "../types/BoardEntity";
import Board from "./Board";
import UsersAvatarsList from "./UsersAvatarsList";

export const BOARDS_HEADER_HEIGHTS = { xs: "120px", md: "56px" };

type BoardDetailsHeaderProps = {
  board: BoardEntity;
  editColumnsMode: boolean;
  setEditColumnsMode: (value: boolean) => void;
  query: string;
  setQuery: (value: string) => void;
};

export default function BoardDetailsHeader({
  board,
  editColumnsMode,
  setEditColumnsMode,
  query,
  setQuery,
}: BoardDetailsHeaderProps) {
  const theme = useTheme();
  const users = useAppSelector((state) => state.users.entities);
  const boardUsers = Object.values(users).filter((user) =>
    board.users.find((boardUserId) => boardUserId === user._id)
  );

  const onClearQuery = () => {
    setQuery("");
  };

  return (
    <>
      <Grid
        className="lim-board-details-header"
        container
        maxWidth="xl"
        sx={{
          mx: 0,
          mb: 6,
          mt: { xs: 3, md: 0 },
        }}
      >
        <Grid
          item
          xs={0}
          md={4}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Typography
            variant="h5"
            color="black"
            fontWeight={300}
            display="inline"
          >
            {board.title}
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            placeholder="Search"
            variant="standard"
            sx={{ width: { xs: "100%", md: "auto" } }}
            InputProps={{
              endAdornment: query ? (
                <IconButton
                  onClick={onClearQuery}
                  size="small"
                >
                  <Close />
                </IconButton>
              ) : (
                <Search
                  sx={{
                    color: theme.palette.text.disabled,
                    p: "5px",
                  }}
                />
              ),
              sx: {
                px: 2,
              },
            }}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          sx={{
            justifyContent: { xs: "space-between", sm: "flex-end" },
            alignItems: "center",
            display: "flex",
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Box sx={{ mr: { xs: 0, sm: 3 } }}>
            <Switch
              size="small"
              value={editColumnsMode}
              onChange={(event) => setEditColumnsMode(event.target.checked)}
            />
            <Typography
              variant="body2"
              sx={{ display: "inline-block", ml: 1 }}
            >
              Edit columns
            </Typography>
          </Box>
          <UsersAvatarsList
            boardId={board._id}
            users={boardUsers}
          />
        </Grid>
      </Grid>
    </>
  );
}
