import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CardPrioritySelector from "../../boards/components/CardPrioritySelector";
import { CardEntity } from "../types/CardEntity";
import { useAppDispatch, useAppSelector } from "../../../store";
import { onUpdateBoard } from "../../boards/boardsSlice";
import { CreateCardDto } from "../types/dto/CreateCardDto";
import { createCardModalClosed, onCreateCard } from "../cardsSlice";
import { Close } from "@mui/icons-material";

export default function CreateCardModal() {
  const [cardPriority, setCardPriority] = useState(0);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const createCardForBoardId = useAppSelector(
    (state) => state.cards.createCardForBoardId
  );
  const createCardForColumnId = useAppSelector(
    (state) => state.cards.createCardForColumnId
  );
  const createCardIndex = useAppSelector(
    (state) => state.cards.createCardIndex
  );

  const dispatch = useAppDispatch();

  const showModal =
    createCardForBoardId !== null && createCardForColumnId !== null;

  const board = useAppSelector((state) =>
    showModal ? state.boards.entities[createCardForBoardId] : null
  );

  const resetState = () => {
    setCardPriority(0);
    setCardTitle("");
    setCardDescription("");
  };

  const onCloseModal = () => {
    dispatch(createCardModalClosed());
    resetState();
  };

  const handleCreateCardClick = () => {
    if (showModal && board && createCardIndex !== null) {
      const createCardDto: CreateCardDto = {
        title: cardTitle,
        index: createCardIndex,
        description: cardDescription,
        priority: cardPriority,
        assignee: null,
      };
      dispatch(
        onCreateCard({
          boardId: createCardForBoardId,
          columnId: createCardForColumnId,
          createCardDto,
        })
      ).then(() => onCloseModal());
    }
  };

  return (
    <>
      <Dialog
        onClose={onCloseModal}
        open={showModal}
        PaperProps={{
          sx: {
            width: "380px",
          },
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: `1px solid rgba(0,0,0,0.15)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 2,
          }}
        >
          <span>New Card</span>
          <IconButton onClick={onCloseModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="subtitle2"
            sx={{ mt: 3 }}
          >
            Title
          </Typography>
          {/* TODO: add assignee selector */}
          <TextField
            variant="standard"
            placeholder="Title"
            fullWidth
            sx={{ mt: 2 }}
            value={cardTitle}
            onChange={(event) => setCardTitle(event.target.value)}
          />
          <Typography
            variant="subtitle2"
            sx={{ mt: 2 }}
          >
            Description
          </Typography>
          <TextField
            variant="filled"
            placeholder="Description"
            multiline
            rows={4}
            fullWidth
            sx={{ mt: 2 }}
            value={cardDescription}
            onChange={(event) => setCardDescription(event.target.value)}
          />
          <Typography
            variant="subtitle2"
            sx={{ mt: 2 }}
          >
            Priority
          </Typography>
          <CardPrioritySelector
            value={cardPriority}
            onChange={setCardPriority}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid rgba(0,0,0,0.15)` }}>
          <Button
            variant="contained"
            disableElevation
            disabled={!cardTitle}
            onClick={handleCreateCardClick}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
