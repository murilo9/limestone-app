import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { cardSelected } from "../cardsSlice";
import { CardEntity } from "../types/CardEntity";
import CardPriorityDisplay from "./CardPriorityDisplay";

export default function CardDetailsModal() {
  const [fetchingComments, setFetchingComments] = useState(true);
  const dispatch = useAppDispatch();
  const selectedCardId = useAppSelector((state) => state.cards.selectedCardId);
  const card: CardEntity | undefined = useAppSelector(
    (state) => state.cards.entities[selectedCardId || ""]
  );
  const showModal = card !== undefined;

  useEffect(() => {
    // TODO: fetch comments
  }, []);

  const onCloseModal = () => {
    dispatch(cardSelected(null));
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
        {card ? (
          <>
            <DialogTitle
              sx={{
                borderBottom: `1px solid rgba(0,0,0,0.15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pr: 2,
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {card.title}
              </Typography>
              <IconButton onClick={onCloseModal}>
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography
                variant="subtitle2"
                sx={{ mt: 2 }}
              >
                Description
              </Typography>
              {card.description ? (
                <Typography
                  variant="body2"
                  sx={{ mt: 2 }}
                >
                  {card.description}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ mt: 2 }}
                  fontStyle="italic"
                >
                  No description
                </Typography>
              )}
              <Typography
                variant="subtitle2"
                sx={{ mt: 2 }}
              >
                Priority
              </Typography>
              <CardPriorityDisplay priority={card.priority} />
              <Typography
                variant="subtitle2"
                sx={{ mt: 2 }}
              >
                Comments
              </Typography>
            </DialogContent>
          </>
        ) : (
          "error-selected-card-not-found"
        )}
      </Dialog>
    </>
  );
}
