import { PersonAddAlt } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../store";
import { firstLetters } from "../../common/utils/firstLetters";
import { UserEntity } from "../../users/types/User";
import { manageBoardPeopleChanged } from "../boardsSlice";

type UsersAvatarsListProps = {
  boardId: string;
  users: UserEntity[];
  sx?: { [key: string]: any };
};

const renderAvatar = (users: UserEntity[], index: number) =>
  users[index] ? (
    <Box sx={{ width: "20px" }}>
      <Avatar sx={{ border: "3px solid white", float: "right" }}>
        {firstLetters(users[index].firstName, users[index].lastName)}
      </Avatar>
    </Box>
  ) : null;

const AVATARS_AMOUNT = [0, 1, 2, 3];

export default function UsersAvatarsList({
  boardId,
  users,
  sx,
}: UsersAvatarsListProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const title = users.map((user, index) =>
    index >= 4
      ? `, and ${users.length - 4} others`
      : `${index > 0 ? ", " : ""}${user.firstName}`
  );

  const onClick = () => {
    dispatch(manageBoardPeopleChanged(boardId));
  };

  return users.length ? (
    <Tooltip
      title={title}
      arrow
    >
      <Box
        sx={{ display: "flex", cursor: "pointer", pl: 4, ...sx }}
        onClick={onClick}
      >
        {AVATARS_AMOUNT.map((index) => renderAvatar(users, index))}
        {users.length >= 5 ? (
          <Box sx={{ width: "24px" }}>
            <Avatar
              sx={{
                border: "3px solid white",
                float: "right",
                color: theme.palette.primary.main,
                fontWeight: 500,
                fontSize: "16px",
                bgcolor: "#DDDDDD",
              }}
            >
              +{users.length - 4}
            </Avatar>
          </Box>
        ) : null}
      </Box>
    </Tooltip>
  ) : (
    <>
      <Button
        disableElevation
        color="secondary"
        sx={{
          ...sx,
          display: { xs: "none", sm: "block" },
          mr: 2,
        }}
        onClick={onClick}
        variant="contained"
      >
        Add People
      </Button>
      <IconButton
        sx={{ ...sx, display: { xs: "flex", sm: "none" } }}
        onClick={onClick}
        color="primary"
      >
        <PersonAddAlt />
      </IconButton>
    </>
  );
}
