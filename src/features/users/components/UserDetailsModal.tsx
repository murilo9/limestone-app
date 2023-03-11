/* eslint-disable no-loop-func */
import { CircleOutlined, Close, Search } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Avatar,
  Link,
  TextField,
  Input,
  useTheme,
  Switch,
} from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../store";
import { updateBoard } from "../../boards/api/updateBoard";
import { onUpdateBoard } from "../../boards/boardsSlice";
import { BoardEntity } from "../../boards/types/BoardEntity";
import { toastNotificationSent } from "../../common/commonSlice";
import { UserEntity } from "../types/User";
import { displayUserChanged } from "../usersSlice";
import UserBoardCard from "./UserBoardCard";

const reduceBoards = (userBoards: BoardEntity[]) =>
  userBoards.reduce((acc, board) => {
    return { ...acc, [board._id]: board };
  }, {} as { [boardId: string]: BoardEntity });

export default function UserDetailsModal() {
  const dispatch = useAppDispatch();
  // TODO: text fields state
  const [isEditingBoards, setIsEditingBoards] = useState(false);
  const [searchBoardsQuery, setSearchBoardsQuery] = useState("");
  const [showAllBoards, setShowAllBoards] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const selectedUser = useAppSelector((state) => state.users.displayUser);
  const boards = useAppSelector((state) => state.boards.entities);
  const userBoards = useMemo(
    () =>
      Object.values(boards).filter((board) =>
        Object.values(board.users).find(
          (boardUserId) => boardUserId === selectedUser?._id
        )
      ),
    [boards, selectedUser?._id]
  );
  const [assignedBoards, setAssignedBoards] = useState<{
    [boardId: string]: BoardEntity;
  }>(reduceBoards(userBoards));
  const loggedUser = useAppSelector(
    (state) => state.users.loggedUser
  ) as UserEntity;
  const loggedUserIsAdmin = loggedUser.createdBy === null;

  const [assignedBoardsChanged, setAssignedBoardsChanged] = useState(false);

  const anythingChanged = assignedBoardsChanged;

  const onCloseModal = () => {
    dispatch(displayUserChanged(null));
  };

  const onEditBoardsClick = () => {
    setIsEditingBoards(!isEditingBoards);
  };

  const onAssignBoard = (board: BoardEntity) => {
    setAssignedBoards({
      ...assignedBoards,
      [board._id]: board,
    });
    setAssignedBoardsChanged(true);
  };

  const onUnassignBoard = (board: BoardEntity) => {
    const updatedAssignedBoards = { ...assignedBoards };
    delete updatedAssignedBoards[board._id];
    setAssignedBoards(updatedAssignedBoards);
    setAssignedBoardsChanged(true);
  };

  const renderEditBoards = () =>
    searchBoardsQuery.trim()
      ? Object.values(boards)
          .filter((board) =>
            board.title.toLowerCase().includes(searchBoardsQuery.toLowerCase())
          )
          .map((board) => (
            <UserBoardCard
              boardId={board._id}
              key={board._id}
              onAssignBoardClick={() => onAssignBoard(board)}
              onUnassignBoardClick={() => onUnassignBoard(board)}
              assignedToUser={Boolean(
                Object.values(assignedBoards).find(
                  (assignedBoard) => assignedBoard._id === board._id
                )
              )}
            />
          ))
      : showAllBoards
      ? Object.values(boards).map((board) => (
          <UserBoardCard
            boardId={board._id}
            key={board._id}
            onAssignBoardClick={() => onAssignBoard(board)}
            onUnassignBoardClick={() => onUnassignBoard(board)}
            assignedToUser={Boolean(assignedBoards[board._id])}
          />
        ))
      : Object.values(assignedBoards).map((board) => (
          <UserBoardCard
            boardId={board._id}
            key={board._id}
            onAssignBoardClick={() => onAssignBoard(board)}
            onUnassignBoardClick={() => onUnassignBoard(board)}
            assignedToUser={true}
          />
        ));

  const onSaveChangesCompleted = () => {
    dispatch(
      toastNotificationSent({
        message: "Changes saved successfully.",
        type: "success",
      })
    );
    console.log("setIsFetching FALSE");
    setIsFetching(false);
    clearState();
  };

  const onSaveChanges = () => {
    setIsFetching(true);
    let requestsToProcess = Object.values(boards).length;
    for (const board of Object.values(boards)) {
      const updatedBoardUsers = assignedBoards[board._id]
        ? [...board.users, (selectedUser as UserEntity)._id]
        : board.users.filter((userId) => userId !== selectedUser?._id);
      const updatedBoard: BoardEntity = {
        ...board,
        users: updatedBoardUsers,
      };
      dispatch(onUpdateBoard(updatedBoard))
        .then(() => {
          requestsToProcess--;
          console.log("remaining requests", requestsToProcess);
          if (requestsToProcess === 0) {
            onSaveChangesCompleted();
          }
        })
        .catch(() => {
          dispatch(
            toastNotificationSent({
              message:
                "There was an error while updating some boards. Re-check your changes and try again.",
              type: "error",
            })
          );
          setIsFetching(false);
        });
    }
  };

  const clearState = () => {
    setIsEditingBoards(false);
    setSearchBoardsQuery("");
    setAssignedBoardsChanged(false);
  };

  useEffect(() => {
    clearState();
  }, [selectedUser]);

  return (
    <>
      <Dialog
        onClose={onCloseModal}
        open={Boolean(selectedUser)}
        PaperProps={{
          sx: {
            width: "380px",
            height: { xs: "100%", sm: "85%" },
          },
        }}
      >
        <DialogContent sx={{ py: 4, display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex" }}>
            <Avatar sx={{ width: "96px", height: "96px" }}>JD</Avatar>
            <Box
              sx={{
                flex: "1 1",
                pl: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  fontSize={20}
                  color="#000000"
                >{`${selectedUser?.firstName} ${selectedUser?.lastName}`}</Typography>
                {loggedUser._id === selectedUser?._id ? (
                  <Link
                    underline="none"
                    component="button"
                    variant="subtitle1"
                  >
                    Edit
                  </Link>
                ) : null}
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  color="#000000"
                >
                  todo-user-title
                </Typography>
                <Link
                  underline="none"
                  component="button"
                  variant="subtitle1"
                  sx={{
                    visibility: loggedUserIsAdmin ? "visible" : "hidden",
                  }}
                >
                  Edit
                </Link>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 4,
              mb: 1,
            }}
          >
            <Typography
              variant="subtitle1"
              color="#000000"
            >
              Boards
            </Typography>
            <Link
              underline="none"
              component="button"
              variant="subtitle1"
              sx={{
                visibility: loggedUserIsAdmin ? "visible" : "hidden",
              }}
              onClick={onEditBoardsClick}
            >
              {isEditingBoards ? "Cancel" : "Edit"}
            </Link>
          </Box>
          <Box
            sx={{ flex: "1 1", display: "flex", flexDirection: "column" }}
            className="lim-user-boards"
          >
            {isEditingBoards ? (
              <>
                <Box sx={{ mt: 1 }}>
                  <Switch
                    checked={showAllBoards}
                    onChange={(event) => setShowAllBoards(event.target.checked)}
                    size="small"
                  />{" "}
                  Show all boards
                </Box>
                <Input
                  value={searchBoardsQuery}
                  onChange={(event) => setSearchBoardsQuery(event.target.value)}
                  placeholder="Search boards"
                  startAdornment={<Search sx={{ mr: 1 }} />}
                  endAdornment={
                    searchBoardsQuery ? (
                      <IconButton
                        size="small"
                        onClick={() => setSearchBoardsQuery("")}
                      >
                        <Close />
                      </IconButton>
                    ) : null
                  }
                  sx={{ px: 1, mb: 4, mt: 3 }}
                />
              </>
            ) : null}
            {isEditingBoards
              ? renderEditBoards()
              : userBoards.map((board) => (
                  <Typography
                    variant="body1"
                    key={board._id}
                  >
                    {board.title}
                  </Typography>
                ))}
            {!userBoards.length &&
            !searchBoardsQuery.trim() &&
            !isEditingBoards ? (
              <Typography
                variant="body2"
                fontStyle="italic"
                textAlign="center"
                sx={{ mt: 3 }}
              >
                Not in any boards yet
              </Typography>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid rgba(0,0,0,0.15)` }}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={onCloseModal}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={onSaveChanges}
            disabled={!anythingChanged || isFetching}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
