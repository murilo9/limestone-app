import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store";
import { Board } from "../../boards/types/Board";
import { User } from "../types/User";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  const boards = useAppSelector((state) => state.boards.entities);
  const userBoards = Object.values(boards).filter((board) =>
    Object.values(board.users).find((boardUserId) => boardUserId === user._id)
  );

  return (
    <>
      <Box
        sx={{
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          bgcolor: "rgba(0,0,0,0.01)",
          borderRadius: "8px",
          px: 5,
          py: 3,
        }}
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
          variant="caption"
          color="text.secondary"
          textAlign="center"
          sx={{ minHeight: "line-height" }}
        >
          {/* TODO: add title attribute */}
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
