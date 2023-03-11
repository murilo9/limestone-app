import { MoreVertRounded } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { UserEntity } from "../../users/types/User";
import { onDeleteCardComment } from "../cardCommentsSlice";
import { CardCommentEntity } from "../types/CardComment";

type CardCommentProps = {
  boardId: string;
  cardId: string;
  cardCommentId: string;
};

export default function CardComment({
  cardCommentId,
  boardId,
  cardId,
}: CardCommentProps) {
  const [showDeleteCommentConfirm, setShowDeleteCommentConfirm] =
    useState(false);
  const dispatch = useAppDispatch();
  const comment: CardCommentEntity | undefined = useAppSelector(
    (state) => state.cardComments.entities[cardCommentId]
  );
  const commentAuthor: UserEntity = useAppSelector(
    (state) => state.users.entities[comment?.author]
  );
  if (!commentAuthor) {
    throw new Error("Comment author could not be found!");
  }
  const currentUser = useAppSelector(
    (state) => state.users.loggedUser
  ) as UserEntity;
  const currentUserIsAdmin = currentUser.createdBy === null;
  const currentUserIsAuthor = currentUser._id === commentAuthor._id;

  const [contextMenuAnchorEl, setContextMenuAnchorEl] =
    useState<HTMLElement | null>(null);
  const showContextMenu = Boolean(contextMenuAnchorEl);

  const onDeleteCommentClick = () => {
    setShowDeleteCommentConfirm(true);
  };

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setContextMenuAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setContextMenuAnchorEl(null);
    setShowDeleteCommentConfirm(false);
  };

  const onDeleteCommentConfirm = () => {
    dispatch(onDeleteCardComment({ boardId, cardCommentId, cardId }));
  };

  return (
    <>
      <Card
        elevation={0}
        sx={{
          bgcolor: "rgba(0,0,0, 0.01)",
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          "&:not(:last-child)": {
            mb: 1,
          },
        }}
      >
        {comment ? (
          <>
            <CardHeader
              avatar={<Avatar>JD</Avatar>}
              action={
                currentUserIsAuthor || currentUserIsAdmin ? (
                  <>
                    <IconButton onClick={onMenuClick}>
                      <MoreVertRounded />
                    </IconButton>
                    <Menu
                      anchorEl={contextMenuAnchorEl}
                      open={showContextMenu}
                      onClose={onMenuClose}
                    >
                      {currentUserIsAuthor ? <MenuItem>Edit</MenuItem> : null}
                      {showDeleteCommentConfirm ? (
                        <MenuItem onClick={onDeleteCommentConfirm}>
                          <Typography color="error">
                            Delete: Click to confirm
                          </Typography>
                        </MenuItem>
                      ) : (
                        <MenuItem
                          onClick={onDeleteCommentClick}
                          color="red"
                        >
                          <Typography color="error">Delete</Typography>
                        </MenuItem>
                      )}
                    </Menu>
                  </>
                ) : null
              }
              title={`${commentAuthor.firstName} ${commentAuthor.lastName}`}
              subheader={new Date(comment.updated).toLocaleString()}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                pt: 0,
                pr: { xs: 2, sm: 3 },
              }}
            >
              <Typography
                variant="body2"
                sx={{ width: { xs: "100%", sm: "calc(100% - 56px)" } }}
              >
                {comment.body}
              </Typography>
            </CardContent>
          </>
        ) : (
          "error-comment-not-found " + commentAuthor
        )}
      </Card>
    </>
  );
}
