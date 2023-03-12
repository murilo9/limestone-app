import { Close, Search } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  DialogTitle,
  IconButton,
  TextField,
  Box,
  Input,
  Switch,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { toastNotificationSent } from "../../common/commonSlice";
import { UserEntity } from "../../users/types/User";
import { manageBoardPeopleChanged, onUpdateBoard } from "../boardsSlice";
import { BoardEntity } from "../types/BoardEntity";
import BoardUserCard from "./BoardUserCard";

const reduceUsers = (users: UserEntity[]) =>
  users.reduce((acc, user) => {
    return { ...acc, [user._id]: user };
  }, {} as { [userId: string]: UserEntity });

const searchUserName = (user: UserEntity, query: string) =>
  user.firstName.toLowerCase().includes(query.toLowerCase()) ||
  user.lastName.toLowerCase().includes(query.toLowerCase());

export default function BoardPeopleModal() {
  const dispatch = useAppDispatch();
  const loggedUserIsAdmin = useAppSelector(
    (state) => state.users.loggedUser?.createdBy === null
  );
  const board = useAppSelector((state) => state.boards.manageBoardPeople);
  const [isFetching, setIsFetching] = useState(false);
  const [assignedUsersChanged, setAssignedUsersChanged] = useState(false);
  const [searchUsersQuery, setSearchUserssQuery] = useState("");
  const [showAllUsers, setShowAllUsers] = useState(false);
  const users = useAppSelector((state) => state.users.entities);
  const boardUsers = useMemo(
    () =>
      Object.values(users).filter((user) =>
        board?.users.find((boardUserId) => boardUserId === user._id)
      ),
    [board, users]
  );
  const [assignedUsers, setAssignedUsers] = useState<{
    [userId: string]: UserEntity;
  }>({});

  useEffect(() => {
    if (board) {
      setAssignedUsers(reduceUsers(boardUsers));
    }
  }, [board, boardUsers]);

  const onCloseModal = () => {
    dispatch(manageBoardPeopleChanged(null));
    clearState();
  };

  const clearState = () => {
    setAssignedUsersChanged(false);
    setSearchUserssQuery("");
  };

  const onSaveChanges = () => {
    if (board) {
      setIsFetching(true);
      const updatedBoard: BoardEntity = {
        ...board,
        users: Object.keys(assignedUsers),
      };
      dispatch(onUpdateBoard(updatedBoard))
        .catch(() => {
          dispatch(
            toastNotificationSent({
              message:
                "There was an error while updating the board. Review your changes and try again.",
              type: "error",
            })
          );
        })
        .then(() => {
          dispatch(
            toastNotificationSent({
              message: "Changes saved successfully.",
              type: "success",
            })
          );
          clearState();
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  const onAssignUser = (userId: string) => {
    const user = users[userId];
    setAssignedUsers({
      ...assignedUsers,
      [userId]: user,
    });
    setAssignedUsersChanged(true);
  };

  const onUnassignUser = (userId: string) => {
    const updatedAssignedUsers = { ...assignedUsers };
    delete updatedAssignedUsers[userId];
    setAssignedUsers(updatedAssignedUsers);
    setAssignedUsersChanged(true);
  };

  return board ? (
    <>
      <Dialog
        onClose={onCloseModal}
        open={Boolean(board)}
        PaperProps={{
          sx: {
            width: "380px",
            height: { xs: "100%", sm: "85%" },
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
          <span>{board?.title}</span>
          <IconButton onClick={onCloseModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Input
            placeholder="Search users"
            startAdornment={<Search />}
            sx={{ mt: 4 }}
            value={searchUsersQuery}
            onChange={(event) => setSearchUserssQuery(event.target.value)}
          />
          <Box sx={{ mt: 3 }}>
            <Switch
              checked={showAllUsers}
              onChange={(event) => setShowAllUsers(event.target.checked)}
              size="small"
            />{" "}
            Show all users
          </Box>
          <Box sx={{ mt: 3 }}>
            {(searchUsersQuery.trim()
              ? Object.values(users)
                  .filter((user) =>
                    searchUserName(user, searchUsersQuery.trim())
                  )
                  .map((user) => user._id)
              : showAllUsers
              ? Object.values(users).map((user) => user._id)
              : Object.keys(assignedUsers)
            ).map((userId) => (
              <BoardUserCard
                user={users[userId]}
                isAdded={Boolean(assignedUsers[userId])}
                onAddClick={() => onAssignUser(userId)}
                onRemoveClick={() => onUnassignUser(userId)}
                loggedUserIsAdmin={loggedUserIsAdmin}
              />
            ))}
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
          {loggedUserIsAdmin ? (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={onSaveChanges}
              disabled={!assignedUsersChanged || isFetching}
            >
              Save
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  ) : null;
}
