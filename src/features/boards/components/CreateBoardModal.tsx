import { Close, DeleteOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import React, { KeyboardEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { createBoardModalChanged, onCreateBoard } from "../boardsSlice";
import { CreateBoardDto } from "../types/dto/CreateBoardDto";

type FormSteps = 1 | 2;

export default function CreateBoardModal() {
  const dispatch = useAppDispatch();
  const [currentFormStep, setCurrentFormStep] = useState<FormSteps>(1);
  const [boardTitle, setBoardTitle] = useState("");
  const [boardColumns, setBoardColumns] = useState<string[]>([]);
  const [newColumnName, setNewColumnName] = useState("");

  const isCreatingBoard = useAppSelector(
    (state) => state.boards.isCreatingBoard
  );
  // Next button is disabled if in step 1 and board has no title
  const nextButtonIsDisabled =
    currentFormStep === 1 ? !boardTitle : isCreatingBoard;
  const showModal = useAppSelector(
    (state) => state.boards.showCreateBoardModal
  );

  const onNextButtonClick = () => {
    switch (currentFormStep) {
      case 1:
        setCurrentFormStep(2);
        break;
      case 2:
        onCreateBoardSubmit();
        break;
    }
  };

  const handleColumnNameInputKeyPress: KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      setBoardColumns([...boardColumns, newColumnName]);
      setNewColumnName("");
    }
  };

  const handleBoardNameInputKeyPress: KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      onNextButtonClick();
    }
  };

  const onCloseModal = () => {
    setCurrentFormStep(1);
    setBoardTitle("");
    setBoardColumns([]);
    setNewColumnName("");
    dispatch(createBoardModalChanged(false));
  };

  const onCreateBoardSubmit = () => {
    const createBoardDto: CreateBoardDto = {
      title: boardTitle,
      users: [],
      columns: boardColumns,
      settings: {
        canCreateCards: [],
        canCommentOnCards: [],
      },
    };
    dispatch(onCreateBoard(createBoardDto))
      .catch((error) => {
        console.log(error);
        // TODO: show toast notification
      })
      .then(() => {
        onCloseModal();
      });
  };

  const onBackButtonClick = () => {
    switch (currentFormStep) {
      case 1:
        onCloseModal();
        break;
      case 2:
        setCurrentFormStep(1);
        break;
    }
  };

  const onRemoveColumn = (index: number) => {
    const updatedColumns = [...boardColumns];
    updatedColumns.splice(index, 1);
    setBoardColumns(updatedColumns);
  };

  const renderCurrentFormStep = () => {
    switch (currentFormStep) {
      case 1:
        return (
          <>
            <Typography
              variant="subtitle2"
              sx={{ mt: 3 }}
            >
              What is the board's name?
            </Typography>
            <TextField
              variant="standard"
              placeholder="Title"
              fullWidth
              sx={{ mt: 2 }}
              value={boardTitle}
              onChange={(event) => setBoardTitle(event.target.value)}
              onKeyUp={handleBoardNameInputKeyPress}
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography
              variant="subtitle2"
              sx={{ mt: 3 }}
            >
              Would like to define some columns?
            </Typography>
            <Typography variant="caption">
              You may define some columns now, or skip for later
            </Typography>
            <TextField
              variant="standard"
              placeholder="Column name (ex: To-do)"
              fullWidth
              sx={{ mt: 3, mb: 3 }}
              value={newColumnName}
              onChange={(event) => setNewColumnName(event.target.value)}
              onKeyUp={handleColumnNameInputKeyPress}
            />
            {boardColumns.map((columnName, index) => (
              <Box
                sx={{
                  display: boardColumns.length ? "flex" : "none",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1">{columnName}</Typography>
                <IconButton
                  color="error"
                  onClick={() => onRemoveColumn(index)}
                >
                  <DeleteOutlined />
                </IconButton>
              </Box>
            ))}
          </>
        );
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
          <span>New Board</span>
          <IconButton onClick={onCloseModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ my: 4 }}>{renderCurrentFormStep()}</DialogContent>
        <DialogActions sx={{ p: 2, borderTop: `1px solid rgba(0,0,0,0.15)` }}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={onBackButtonClick}
          >
            {currentFormStep === 1 ? "Cancel" : "Back"}
          </Button>
          <Button
            variant="contained"
            disableElevation
            disabled={nextButtonIsDisabled}
            onClick={onNextButtonClick}
          >
            {currentFormStep === 2 ? "Create" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
