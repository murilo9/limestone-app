import {
  Add,
  Delete,
  DeleteOutline,
  DragHandle,
  DragIndicator,
} from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ColumnEntity } from "../types/ColumnEntity";
import CardCard from "../../cards/components/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { BoardsContext } from "../../boards/providers/BoardsProvider";

const COLUMN_FIXED_HEIGHT = "34px";

type BoardColumnProps = {
  boardId: string;
  columnId: string;
  showAddCardsButton: boolean;
  editMode: boolean;
  onDelete: () => void;
};

export default function CardsColumn({
  boardId,
  columnId,
  showAddCardsButton,
  editMode,
  onDelete,
}: BoardColumnProps) {
  const column = useAppSelector((state) => state.columns.entities[columnId]);
  const cards = useAppSelector((state) =>
    Object.values(state.cards.entities).filter(
      (card) => card.columnId === column._id
    )
  );

  const { onOpenCreateCardModal } = useContext(BoardsContext);

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
                height: COLUMN_FIXED_HEIGHT,
              }}
            >
              <Typography variant="subtitle2">{column.title}</Typography>
              {editMode ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={onDelete}
                    >
                      <DeleteOutline />
                    </IconButton>
                    <Box
                      sx={{
                        display: "inline-flex",
                        cursor: "pointer",
                        ml: 1,
                        px: "4px",
                      }}
                    >
                      <DragIndicator />
                    </Box>
                  </Box>
                </>
              ) : showAddCardsButton ? (
                <IconButton
                  color="primary"
                  onClick={() => onOpenCreateCardModal(boardId, columnId)}
                >
                  <Add />
                </IconButton>
              ) : null}
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
                variant="caption"
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
