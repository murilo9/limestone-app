import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { KeyboardEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { BoardEntity } from "../../boards/types/BoardEntity";
import {
  onCreateCardComment,
  onFetchCardComments,
} from "../../card-comments/cardCommentsSlice";
import CardComment from "../../card-comments/components/CardComment";
import { ColumnEntity } from "../../columns/types/ColumnEntity";
import { cardSelected, onDeleteCard } from "../cardsSlice";
import { CardEntity } from "../types/CardEntity";
import CardPriorityDisplay from "./CardPriorityDisplay";

export default function CardDetailsModal() {
  const [fetchingComments, setFetchingComments] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [addingNewComment, setAddingNewComment] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const dispatch = useAppDispatch();
  const selectedCardId = useAppSelector((state) => state.cards.selectedCardId);
  const card: CardEntity | undefined = useAppSelector(
    (state) => state.cards.entities[selectedCardId || ""]
  );
  const cardColumn: ColumnEntity | undefined = useAppSelector(
    (state) => state.columns.entities[card?.columnId]
  );
  const cardBoard: BoardEntity | undefined = useAppSelector(
    (state) => state.boards.entities[cardColumn?.boardId]
  );
  const showModal = card !== undefined;
  const comments = useAppSelector((state) =>
    Object.values(state.cardComments.entities).filter(
      (comment) => comment.cardId === card?._id
    )
  );

  useEffect(() => {
    if (card) {
      dispatch(
        onFetchCardComments({ boardId: cardBoard?._id, cardId: card?._id })
      )
        .catch((error) => {
          // TODO: handle error
        })
        .finally(() => {
          setFetchingComments(false);
        });
    }
  }, [card, cardBoard?._id, dispatch]);

  const onCloseModal = () => {
    dispatch(cardSelected(null));
    setShowDeleteConfirmation(false);
  };

  const onCreateComment = () => {
    setAddingNewComment(true);
    dispatch(
      onCreateCardComment({
        boardId: cardBoard?._id,
        columnId: cardColumn?._id,
        cardId: card._id,
        createCardCommentForm: {
          body: newComment,
        },
      })
    )
      .catch((error) => {
        // TODO: handle error
      })
      .finally(() => {
        setAddingNewComment(false);
        setNewComment("");
      });
  };

  const onDeleteCardConfirm = () => {
    if (card && cardColumn && cardBoard) {
      dispatch(
        onDeleteCard({
          columnId: cardColumn._id,
          boardId: cardBoard._id,
          cardId: card._id,
        })
      );
      onCloseModal();
    }
  };

  return (
    <>
      <Dialog
        onClose={onCloseModal}
        open={showModal}
        PaperProps={{
          sx: {
            maxHeight: "calc(100% - 48px)",
          },
        }}
        maxWidth="md"
        fullWidth
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
                sx={{ mt: 3 }}
              >
                Description
              </Typography>
              {card.description ? (
                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                >
                  {card.description}
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ mt: 1 }}
                  fontStyle="italic"
                >
                  No description yet
                </Typography>
              )}
              <Typography
                variant="subtitle2"
                sx={{ mt: 3 }}
              >
                Priority
              </Typography>
              <CardPriorityDisplay priority={card.priority} />
              <Typography
                variant="subtitle2"
                sx={{ mt: 3 }}
              >
                Comments
              </Typography>
              {fetchingComments ? (
                "Loading comments..."
              ) : comments.length ? (
                comments.map((comment) => (
                  <Box
                    className="lim-card-comments-list"
                    sx={{ mt: 2 }}
                  >
                    <CardComment
                      cardCommentId={comment._id}
                      boardId={cardBoard._id}
                      cardId={card._id}
                    />
                  </Box>
                ))
              ) : (
                <Typography
                  variant="body2"
                  fontStyle="italic"
                  sx={{ mt: 1 }}
                >
                  No comments yet
                </Typography>
              )}
              <TextField
                label="Add comment"
                variant="filled"
                multiline
                rows={3}
                value={newComment}
                onChange={(event) => setNewComment(event.target.value)}
                sx={{ mt: 2, width: "100%" }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: "48px",
                }}
              >
                <Button
                  onClick={onCreateComment}
                  disableElevation
                  disabled={addingNewComment}
                  variant="contained"
                  sx={{
                    mt: 1,
                    display: newComment ? "block" : "none",
                  }}
                >
                  Save
                </Button>
              </Box>
              <Box sx={{ mt: 1 }}>
                {showDeleteConfirmation ? (
                  <>
                    <Typography
                      variant="subtitle2"
                      sx={{ mt: 3 }}
                      color="error"
                    >
                      Are you sure you wish to delete this card?
                    </Typography>
                    <Button
                      disableElevation
                      variant="outlined"
                      sx={{ mt: 2, mr: 1 }}
                      onClick={() => setShowDeleteConfirmation(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      disableElevation
                      color="error"
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={onDeleteCardConfirm}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button
                    disableElevation
                    color="error"
                    variant="outlined"
                    sx={{ mt: 2 }}
                    onClick={() => setShowDeleteConfirmation(true)}
                  >
                    Delete Card
                  </Button>
                )}
              </Box>
            </DialogContent>
          </>
        ) : (
          "error-selected-card-not-found"
        )}
        <DialogActions sx={{ p: 2, borderTop: `1px solid rgba(0,0,0,0.15)` }}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={onCloseModal}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
