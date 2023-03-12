import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { UserEntity } from "../../users/types/User";

type BoardUserCardProps = {
  user: UserEntity;
  onRemoveClick: () => void;
  onAddClick: () => void;
  isAdded: boolean;
  loggedUserIsAdmin: boolean;
};

export default function BoardUserCard({
  user,
  isAdded,
  onRemoveClick,
  onAddClick,
  loggedUserIsAdmin,
}: BoardUserCardProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          bgcolor: "rgba(0,0,0,0.01)",
          borderRadius: "8px",
          pl: 3,
          pr: 1,
          py: 2,
          ":not(:last-child)": {
            mb: 1,
          },
        }}
      >
        <Avatar sx={{ width: "48px", height: "48px", margin: "auto" }}>
          {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
        </Avatar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flex: "1 1",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              color="black"
              sx={{ ml: 2 }}
            >
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontStyle={user.title ? undefined : "italic"}
              sx={{ ml: 2 }}
            >
              {user.title || "No title"}
            </Typography>
          </Box>
          <Box>
            {loggedUserIsAdmin ? (
              <Button
                color={isAdded ? "error" : "info"}
                onClick={isAdded ? onRemoveClick : onAddClick}
              >
                {isAdded ? "Remove" : "Add"}
              </Button>
            ) : null}
          </Box>
        </Box>
      </Box>
    </>
  );
}
