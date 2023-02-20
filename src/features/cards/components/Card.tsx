import { Circle, Comment } from "@mui/icons-material";
import { Avatar, Box, Grid, Rating, Skeleton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { CardEntity } from "../types/CardEntity";
import { CardCommentEntity } from "../../card-comments/types/CardComment";
import { cardSelected } from "../cardsSlice";
import { cardPriorityColor } from "../types/CardPriorityColor";

type CardProps = {
  card: CardEntity;
  cardIndex: number;
  boardId: string;
  columnId: string;
};

export default function Card({
  card,
  boardId,
  columnId,
  cardIndex,
}: CardProps) {
  const users = useAppSelector((state) => state.users.entities);
  const cardAssignee = card.assignee ? users[card.assignee] : null;
  const dispatch = useAppDispatch();

  const onCardClick = () => {
    dispatch(cardSelected(card._id));
  };

  return (
    <>
      <Draggable
        key={card._id}
        draggableId={card._id}
        index={cardIndex}
      >
        {(provided) => (
          <Box
            sx={{
              bgcolor: "rgba(178, 203, 206, 0.5)",
              p: 1,
              borderRadius: "6px",
              "&:not(:last-child)": {
                mb: 1,
              },
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={onCardClick}
          >
            <Typography
              variant="body2"
              sx={{ whiteSpace: "break-spaces" }}
            >
              {card.title}
            </Typography>
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
                  color={
                    Number("todo-comments-count") > 0 ? "primary" : "disabled"
                  }
                />
                {Number("todo-comments-count") === undefined ? (
                  <Skeleton
                    variant="text"
                    width="1em"
                  />
                ) : (
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={
                      Number("todo-comments-count") > 0 ? "primary" : "disabled"
                    }
                  >
                    {"0" /* todo-comments-count */}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Rating
                  readOnly
                  defaultValue={card.priority + 1}
                  max={4}
                  sx={{ transform: "rotate(180deg)" }}
                  icon={
                    <Circle
                      sx={{
                        color: cardPriorityColor[card.priority],
                        fontSize: "10px",
                      }}
                    />
                  }
                  emptyIcon={
                    <Circle
                      sx={{ color: "rgba(0,0,0,0.2)", fontSize: "10px" }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Draggable>
    </>
  );
}
