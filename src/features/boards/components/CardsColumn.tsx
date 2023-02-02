import { Add } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { BoardColumn } from "../types/BoardColumn";
import CardCard from "./CardCard";
import { Droppable, Draggable } from "react-beautiful-dnd";

type BoardColumnProps = {
  boardId: string;
  columnIndex: number;
};

export default function CardsColumn({
  boardId,
  columnIndex,
}: BoardColumnProps) {
  const column = useAppSelector(
    (state) => state.boards.entities[boardId].columns[columnIndex]
  );
  const dispatch = useAppDispatch();
  const { cards } = column;

  return (
    <>
      <Droppable droppableId={column._id}>
        {(provided) => (
          <Box
            className="lim-cards-column"
            sx={{
              width: "240px",
              display: "inline-block",
              "&:not(:last-child)": { mr: 2 },
              pb: 2,
              flex: "none",
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">{column.title}</Typography>
              <IconButton color="primary">
                <Add />
              </IconButton>
            </Box>
            {cards.length ? (
              cards.map((card, cardIndex) => (
                <CardCard
                  card={card}
                  cardIndex={cardIndex}
                  columnId={column._id}
                  boardId={boardId}
                />
              ))
            ) : (
              <Typography
                variant="body1"
                textAlign="center"
                sx={{ fontStyle: "italic" }}
              >
                Empty
              </Typography>
            )}
          </Box>
        )}
      </Droppable>
    </>
  );
}
