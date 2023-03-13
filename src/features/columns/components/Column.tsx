import {
  Add,
  Delete,
  DeleteOutline,
  DragHandle,
  DragIndicator,
} from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import React, {
  KeyboardEventHandler,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { ColumnEntity } from "../types/ColumnEntity";
import Card from "../../cards/components/Card";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { UpdateColumnDto } from "../types/dto/UpdateColumnDto";
import { createCardModalOpened, onFetchCards } from "../../cards/cardsSlice";

const COLUMN_FIXED_HEIGHT = "34px";

type BoardColumnProps = {
  boardId: string;
  columnId: string;
  showAddCardsButton: boolean;
  editMode: boolean;
  onDelete: () => void;
  onUpdate: (updateColumnDto: UpdateColumnDto) => void;
};

export default function CardsColumn({
  boardId,
  columnId,
  showAddCardsButton,
  editMode,
  onDelete,
  onUpdate,
}: BoardColumnProps) {
  const column = useAppSelector((state) => state.columns.entities[columnId]);
  const cards = useAppSelector((state) =>
    Object.values(state.cards.entities).filter(
      (card) => card.columnId === column._id
    )
  );
  const dispatch = useAppDispatch();
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [editableColumnTitle, setEditableColumnTitle] = useState(column.title);
  const [showUpdatedColumnTitle, setShowUpdatedColumnTitle] = useState(false);
  const [fetchingCards, setFetchingCards] = useState(true);

  useLayoutEffect(() => {
    dispatch(onFetchCards({ columnId, boardId }))
      .catch((error) => {
        // TODO: fetch cards error handling
      })
      .finally(() => {
        setFetchingCards(false);
      });
  }, []);

  const handleColumnTitleInputBlur = () => {
    setEditableColumnTitle(column.title);
    setShowTitleInput(false);
  };

  const handleColumnTitleInputKeyPress: KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      onUpdate({
        title: editableColumnTitle,
        index: column.index,
      });
      setShowTitleInput(false);
      setShowUpdatedColumnTitle(true);
    }
  };

  return (
    <>
      <Box
        className="lim-cards-column"
        sx={{
          width: "240px",
          display: "inline-block",
          "&:not(:last-child)": { mr: 2 },
          pb: 2,
          flex: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: COLUMN_FIXED_HEIGHT,
          }}
        >
          {showTitleInput ? (
            <TextField
              size="small"
              variant="standard"
              autoFocus
              value={editableColumnTitle}
              onChange={(event) => setEditableColumnTitle(event.target.value)}
              onBlur={handleColumnTitleInputBlur}
              onKeyUp={handleColumnTitleInputKeyPress}
              InputProps={{
                sx: { fontSize: "14px", fontWeight: 500 },
              }}
            />
          ) : (
            <Typography
              variant="subtitle2"
              onClick={() => setShowTitleInput(editMode)}
              sx={{
                flex: "1 1",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {showUpdatedColumnTitle ? editableColumnTitle : column.title}
            </Typography>
          )}
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
              onClick={() =>
                dispatch(
                  createCardModalOpened({
                    boardId,
                    columnId,
                    index: cards.length,
                  })
                )
              }
            >
              <Add />
            </IconButton>
          ) : null}
        </Box>
        <Droppable droppableId={column._id}>
          {(provided) => (
            <Box
              className="lim-drag-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {fetchingCards ? (
                "Loading cards..."
              ) : cards.length ? (
                cards.map((card, cardIndex) => (
                  <Card
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
      </Box>
    </>
  );
}
