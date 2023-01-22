import { Comment } from "@mui/icons-material";
import { Avatar, Box, Grid, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { onFetchCardCommentsCount } from "../boardsSlice";
import { Card } from "../types/Card";
import { CardComment } from "../types/CardComment";

type CardCardProps = {
  card: Card;
  boardId: string;
  columnId: string;
};

export default function CardCard({ card, boardId, columnId }: CardCardProps) {
  const users = useAppSelector((state) => state.users.entities);
  const cardAssignee = card.assignee ? users[card.assignee] : null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card.commentsCount === undefined) {
      dispatch(
        onFetchCardCommentsCount({ boardId, columnId, cardId: card._id })
      );
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          bgcolor: "rgba(178, 203, 206, 0.5)",
          p: 1,
          borderRadius: "6px",
          "&:not(:last-child)": {
            mb: 1,
          },
        }}
      >
        <Typography variant="body2">{card.title}</Typography>
        <Grid
          container
          sx={{ mt: 1 }}
        >
          <Grid
            item
            xs={6}
            sx={{ display: "inline-flex", alignItems: "center" }}
          >
            {cardAssignee ? (
              <>
                <Avatar
                  sx={{
                    height: "24px",
                    width: "24px",
                    fontSize: "12px",
                    mr: "12px",
                  }}
                >
                  {cardAssignee.firstName[0].toUpperCase() +
                    cardAssignee.lastName[0].toUpperCase()}
                </Avatar>
              </>
            ) : null}
            <Comment
              fontSize="small"
              sx={{ mr: 0.5 }}
              color={Number(card.commentsCount) > 0 ? "primary" : "disabled"}
            />
            {card.commentsCount === undefined ? (
              <Skeleton
                variant="text"
                width="1em"
              />
            ) : (
              <Typography
                variant="body2"
                fontWeight={500}
                color={Number(card.commentsCount) > 0 ? "primary" : "disabled"}
              >
                {card.commentsCount}
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={6}
          ></Grid>
        </Grid>
      </Box>
    </>
  );
}
