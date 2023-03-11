import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../store";

type UserBoardCardProps = {
  boardId: string;
  assignedToUser: boolean;
  onAssignBoardClick: () => void;
  onUnassignBoardClick: () => void;
};

export default function UserBoardCard({
  boardId,
  assignedToUser,
  onAssignBoardClick,
  onUnassignBoardClick,
}: UserBoardCardProps) {
  const board = useAppSelector((state) => state.boards.entities[boardId]);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          bgcolor: "rgba(0,0,0,0.01)",
          mb: 1,
          pl: 3,
          pr: 1,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ flex: "1 1", mt: 1 }}>
          <Typography
            variant="subtitle1"
            color="#000000"
          >
            {board.title}
          </Typography>
          <Typography variant="body1">todo-cards-assigned</Typography>
        </Box>
        {assignedToUser ? (
          <Button
            color="error"
            disabled={false /* TODO: disabled if cards assigned */}
            onClick={onUnassignBoardClick}
          >
            Remove
          </Button>
        ) : (
          <Button
            color="success"
            onClick={onAssignBoardClick}
          >
            Add
          </Button>
        )}
      </Card>
    </>
  );
}
