import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { BoardEntity } from "../../boards/types/BoardEntity";
import { UserEntity } from "../types/User";
import { displayUserChanged } from "../usersSlice";

type UserCardProps = {
  user: UserEntity;
};

export default function UserCard({ user }: UserCardProps) {
  const dispatch = useAppDispatch();
  const boards = useAppSelector((state) => state.boards.entities);
  const userBoards = Object.values(boards).filter((board) =>
    Object.values(board.users).find((boardUserId) => boardUserId === user._id)
  );

  const onCardClick = () => {
    dispatch(displayUserChanged(user._id));
  };

  return (
    <>
      <Box
        sx={{
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          bgcolor: "rgba(0,0,0,0.01)",
          borderRadius: "8px",
          px: 5,
          py: 3,
          cursor: "pointer",
        }}
        onClick={onCardClick}
      >
        <Avatar sx={{ width: "72px", height: "72px", margin: "auto", mb: 2 }}>
          {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
        </Avatar>
        <Typography
          variant="h5"
          color="black"
          textAlign="center"
        >
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          fontStyle={user.title ? undefined : "italic"}
          sx={{ minHeight: "line-height" }}
        >
          {user.title || "No title"}
        </Typography>
        <Box
          sx={{
            minHeight: "calc(4 * 28px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: userBoards.length ? null : "center",
          }}
        >
          {userBoards.length ? (
            userBoards.map((board, index) =>
              index < 3 ? (
                <Typography variant="subtitle1">{board.title}</Typography>
              ) : (
                <Typography variant="subtitle2">
                  {userBoards.length - index}+ others
                </Typography>
              )
            )
          ) : (
            <Typography
              variant="subtitle1"
              fontStyle="italic"
              textAlign="center"
            >
              Not member of any boards yet
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}
