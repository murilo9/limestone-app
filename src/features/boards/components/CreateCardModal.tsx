import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CardPrioritySelector from "./CardPrioritySelector";
import { CardEntity } from "../../cards/types/CardEntity";
import { useAppDispatch, useAppSelector } from "../../../store";
import { CardsContext } from "../../cards/providers/CardsProvider";
import { onUpdateBoard } from "../boardsSlice";
import { CreateCardDto } from "../../cards/types/dto/CreateCardDto";
import { onCreateCard } from "../../cards/cardsSlice";

export default function CreateCardModal() {
  const [cardPriority, setCardPriority] = useState(0);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const {
    createCardForBoardId,
    createCardForColumnId,
    onCloseCreateCardModal,
  } = useContext(CardsContext);

  const dispatch = useAppDispatch();

  const showModal = !!createCardForBoardId && createCardForColumnId !== null;

  const board = useAppSelector((state) =>
    showModal ? state.boards.entities[createCardForBoardId] : null
  );

  const handleCreateCardClick = () => {
    const createCardDto: CreateCardDto = {
      title: cardTitle,
      description: cardDescription,
      priority: cardPriority,
      assignee: null,
    };
    if (showModal && board) {
      dispatch(
        onCreateCard({
          boardId: createCardForBoardId,
          columnId: createCardForColumnId,
          createCardDto,
        })
      ).then(() => onCloseCreateCardModal());
    }
  };

  return (
    <>
      <Dialog
        onClose={onCloseCreateCardModal}
        open={showModal}
        PaperProps={{
          sx: {
            width: "380px",
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: `1px solid rgba(0,0,0,0.15)` }}>
          New Card
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
