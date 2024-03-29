import {
  Add,
  Delete,
  DeleteOutline,
  DragHandle,
  DragIndicator,
} from "@mui/icons-material";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
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
import { CardEntity } from "../../cards/types/CardEntity";

const COLUMN_FIXED_HEIGHT = "34px";

type BoardColumnProps = {
  boardId: string;
  columnId: string;
  columnIndex: number;
  showAddCardsButton: boolean;
  editMode: boolean;
  onDelete: () => void;
  onUpdate: (column: ColumnEntity) => void;
  query: string;
};

const filterCardByQuery = (query: string, card: CardEntity) =>
  card.title.toLowerCase().includes(query.toLowerCase());

export default function CardsColumn({
  boardId,
  columnId,
  columnIndex,
  showAddCardsButton,
  editMode,
  onDelete,
  onUpdate,
  query,
}: BoardColumnProps) {
  const column = useAppSelector((state) => state.columns.entities[columnId]);
  const cards = useAppSelector((state) =>
    Object.values(state.cards.entities).filter(
      (card) => card.columnId === column._id
    )
  ).sort((cardA, cardB) => cardA.index - cardB.index);
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
        ...column,
        title: editableColumnTitle,
        index: column.index,
      });
      setShowTitleInput(false);
      setShowUpdatedColumnTitle(true);
    }
  };

  return (
    <>
      <Draggable
        key={column._id}
        draggableId={column._id}
        index={columnIndex}
      >
        {(provided, snapshot) => (
          <Paper
            elevation={0}
            className="lim-cards-column"
            sx={{
              bgcolor: "transparent",
              width: "240px",
              display: "inline-block",
              mr: 2,
              pt: 0.5,
              boxSizing: "border-box",
              flex: "none",
              height: "100%",
              ":active":
                editMode && snapshot.isDragging
                  ? {
                      boxShadow:
                        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                    }
                  : null,
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                height: COLUMN_FIXED_HEIGHT,
                mb: 1,
              }}
            >
              {showTitleInput ? (
                <TextField
                  size="small"
                  variant="standard"
                  autoFocus
                  value={editableColumnTitle}
                  onChange={(event) =>
                    setEditableColumnTitle(event.target.value)
                  }
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
                      {...provided.dragHandleProps}
                    >
                      <DragIndicator />
                    </Box>
                  </Box>
                </>
              ) : showAddCardsButton ? (
                <IconButton
                  sx={{ mr: -1 }}
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
            <Droppable
              droppableId={"column_" + column._id}
              type="CARD"
            >
              {(provided) => (
                <Box
                  className="lim-drag-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {fetchingCards ? (
                    "Loading cards..."
                  ) : cards.length ? (
                    cards
                      .filter((card) =>
                        query.trim()
                          ? filterCardByQuery(query.trim(), card)
                          : true
                      )
                      .map((card, cardIndex) => (
                        <Card
                          card={card}
                          cardIndex={cardIndex}
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
          </Paper>
        )}
      </Draggable>
    </>
  );
}
