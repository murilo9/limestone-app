import {
  Add,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { BoardEntity } from "../types/BoardEntity";
import Column from "../../columns/components/Column";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  onCreateColumn,
  onDeleteColumn,
  onLoadColumns,
  onUpdateColumn,
} from "../../columns/columnsSlice";
import CreateColumnForm from "../../columns/components/CreateColumnForm";
import { UpdateColumnDto } from "../../columns/types/dto/UpdateColumnDto";
import { confirmationDialogOpened } from "../../common/commonSlice";
import {
  manageBoardPeopleChanged,
  onDeleteBoard,
  onUpdateBoard,
} from "../boardsSlice";
import UsersAvatarsList from "./UsersAvatarsList";
import { cardUpdated, onUpdateCard } from "../../cards/cardsSlice";
import { CardEntity } from "../../cards/types/CardEntity";
import useOnDragEnd from "../hooks/useOnDragEnd";
import { ColumnEntity } from "../../columns/types/ColumnEntity";

type BoardProps = {
  board: BoardEntity;
};

export default function Board({ board }: BoardProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [addingNewColumn, setAddingNewColumn] = useState(false);
  const [editColumnsMode, setEditColumnsMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [contextMenuAnchorEl, setContextMenuAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const showContextMenu = Boolean(contextMenuAnchorEl);
  const dispatch = useAppDispatch();

  const columns = useAppSelector((state) =>
    Object.values(state.columns.entities)
      .filter((column) => column.boardId === board._id)
      .sort((columnA, columnB) => columnA.index - columnB.index)
  );
  const users = useAppSelector((state) => state.users.entities);
  const boardUsers = Object.values(users).filter((user) =>
    board.users.find((boardUserId) => boardUserId === user._id)
  );
  const theme = useTheme();

  const loggedUserIsAdmin = useAppSelector(
    (state) => state.users.loggedUser?.createdBy === null
  );

  // Loads this board's columns on start
  useLayoutEffect(() => {
    setLoadingColumns(true);
    dispatch(onLoadColumns(board._id)).then(() => {});
  }, []);

  const handleCreateColumn = (columnTitle: string) => {
    setShowDetails(false);
    setAddingNewColumn(true);
    dispatch(
      onCreateColumn({
        boardId: board._id,
        title: columnTitle,
        index: columns.length,
      })
    )
      .catch((error) => console.log(error))
      .finally(() => {
        setAddingNewColumn(false);
      });
  };

  const handleDeleteColumnClick = (columnId: string) => {
    dispatch(
      confirmationDialogOpened({
        title: "Delete Column",
        message: "Are you sure you want to delete this column?",
        actions: [
          {
            title: "Delete",
            type: "error",
            onClick: () => {
              dispatch(onDeleteColumn({ boardId: board._id, columnId }));
            },
          },
        ],
      })
    );
  };

  const handleUpdateColumn = (column: ColumnEntity) => {
    dispatch(onUpdateColumn({ boardId: board._id, column }));
  };

  const onContextMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setContextMenuAnchorEl(event.currentTarget);
  };

  const onToggleBoardArchiveClick = () => {
    dispatch(
      onUpdateBoard({
        ...board,
        archived: !board.archived,
      })
    );
  };

  const onDeleteBoardClick = () => {
    dispatch(
      confirmationDialogOpened({
        title: "Delete Board: " + board.title,
        message: "Are you sure you want to delete this board?",
        actions: [
          {
            title: "Delete",
            type: "error",
            onClick: () => {
              dispatch(onDeleteBoard(board._id));
            },
          },
        ],
      })
    );
  };

  const onManagePeopleClick = () => {
    dispatch(manageBoardPeopleChanged(board._id));
  };

  const onDragEnd = useOnDragEnd(board._id, setIsDragging);

  const renderBoardDetails = () => (
    <>
      <Box
        className="lim-columns-list"
        sx={{
          width: "100%",
          whiteSpace: "nowrap",
          display: "flex",
          overflowX: "auto",
          pb: 1,
        }}
      >
        {loadingColumns ? (
          <>
            <Droppable
              droppableId={"board_" + board._id}
              direction="horizontal"
              type="COLUMN"
            >
              {(provided) => (
                <>
                  <Box
                    className="lim-droppable-columns-wrapper"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{ display: "flex" }}
                  >
                    {columns.map((column, columnIndex) => (
                      <Column
                        key={column._id}
                        boardId={board._id}
                        columnId={column._id}
                        columnIndex={columnIndex}
                        showAddCardsButton={true}
                        editMode={editColumnsMode}
                        onDelete={() => handleDeleteColumnClick(column._id)}
                        onUpdate={handleUpdateColumn}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Droppable>
            {addingNewColumn ? "Adding..." : null}
            {editColumnsMode && !isDragging ? (
              <CreateColumnForm onSubmit={handleCreateColumn} />
            ) : null}
          </>
        ) : (
          "loading..."
        )}
      </Box>
    </>
  );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Card
          elevation={0}
          sx={{
            border: `1px solid rgba(90, 126, 144, 0.2)`,
            bgcolor: "rgba(0,0,0,0.01)",
            mb: 4,
          }}
        >
          <CardHeader
            action={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <UsersAvatarsList
                  boardId={board._id}
                  users={boardUsers}
                />
                <IconButton onClick={onContextMenuClick}>
                  <MoreHoriz />
                </IconButton>
                <Menu
                  anchorEl={contextMenuAnchorEl}
                  open={showContextMenu}
                  onClose={() => setContextMenuAnchorEl(null)}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  {loggedUserIsAdmin ? (
                    <MenuItem onClick={onManagePeopleClick}>
                      Manage People
                    </MenuItem>
                  ) : null}
                  <MenuItem onClick={onToggleBoardArchiveClick}>
                    {board.archived ? "Unarchive" : "Archive"}
                  </MenuItem>
                  <MenuItem
                    onClick={onDeleteBoardClick}
                    sx={{ color: theme.palette.error.main }}
                    disabled={!board.archived}
                  >
                    Delete {!board.archived ? " (Must be archived)" : ""}
                  </MenuItem>
                </Menu>
              </Box>
            }
            title={board.title}
            titleTypographyProps={{
              sx: {
                color: "#000000",
                textDecoration: "none",
                display: "inline",
                ":hover": {
                  textDecoration: "underline",
                },
              },
              variant: "subtitle1",
              component: "a",
              href: `/boards/${board._id}`,
            }}
            subheaderTypographyProps={{
              variant: "caption",
              sx: { color: "#9FB5B8" },
            }}
            subheader={`Last updated at ${new Date(
              board.updated
            ).toDateString()}`}
          />
          <CardContent sx={{ pt: 0 }}>
            {showDetails
              ? renderBoardDetails()
              : columns.map((column) => (
                  <Box
                    sx={{
                      display: "inline-block",
                      pr: { xs: 4, md: 6 },
                      pt: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      textAlign="right"
                    >
                      todo-cards-length
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      textAlign="right"
                    >
                      {column.title}
                    </Typography>
                  </Box>
                ))}
          </CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              pb: 1,
            }}
          >
            <IconButton onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
        </Card>
      </DragDropContext>
    </>
  );
}
