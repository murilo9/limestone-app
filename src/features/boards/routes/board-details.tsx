import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import { createColumn } from "../../columns/api/createColumn";
import {
  onCreateColumn,
  onDeleteColumn,
  onLoadColumns,
  onUpdateColumn,
} from "../../columns/columnsSlice";
import Column from "../../columns/components/Column";
import CreateColumnForm from "../../columns/components/CreateColumnForm";
import { ColumnEntity } from "../../columns/types/ColumnEntity";
import { UpdateColumnDto } from "../../columns/types/dto/UpdateColumnDto";
import { confirmationDialogOpened } from "../../common/commonSlice";
import { onLoadAllBoards } from "../boardsSlice";
import BoardDetailsHeader from "../components/BoardDetailsHeader";
import useOnDragEnd from "../hooks/useOnDragEnd";
import { BoardEntity } from "../types/BoardEntity";

export default function BoardDetailsPage() {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [editColumnsMode, setEditColumnsMode] = useState(false);
  // TODO: mover esta flag para a store, tanto aqui quanto no component Board
  const [addingNewColumn, setAddingNewColumn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const board: BoardEntity | undefined = useAppSelector(
    (state) => state.boards.entities[boardId || ""]
  );
  const columns = useAppSelector((state) =>
    Object.values(state.columns.entities)
      .filter((column) => column.boardId === boardId)
      .sort((columnA, columnB) => columnA.index - columnB.index)
  );

  const onDragEnd = useOnDragEnd(boardId || "no-id", setIsDragging);

  const onDragStart = () => {
    setIsDragging(true);
  };

  useLayoutEffect(() => {
    const initialLoad = async () => {
      if (!board && boardId) {
        setLoadingBoard(true);
        setLoadingColumns(true);
        await dispatch(onLoadAllBoards());
        setLoadingBoard(false);
        await dispatch(onLoadColumns(boardId));
        setLoadingColumns(false);
      }
    };
    initialLoad();
  }, []);

  const handleCreateColumn = (columnTitle: string) => {
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

  /* TODO: deal with not found board (redirect to 404 page) */

  return (
    <>
      {loadingBoard ? (
        "loading..."
      ) : board ? (
        <DragDropContext
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        >
          <Box
            className="lim-board-page"
            sx={{
              width: "100%",
              height: "100%",
              overflowY: "auto",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                px: { xs: 3, xl: 0 },
                pt: 6,
                pb: { xs: 0, sm: 6 },
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{ mb: { xs: 0, md: 4 } }}
              >
                <Link
                  underline="hover"
                  color="inherit"
                  href="/boards"
                >
                  Boards
                </Link>
                <Typography color="text.primary">{board.title}</Typography>
              </Breadcrumbs>

              <BoardDetailsHeader
                board={board}
                editColumnsMode={editColumnsMode}
                setEditColumnsMode={setEditColumnsMode}
              />
              <Box
                className="lim-columns-list"
                sx={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  display: "flex",
                  overflowX: "auto",
                  flex: 1,
                }}
              >
                {!loadingColumns ? (
                  <>
                    <Droppable
                      droppableId={"board_" + board._id}
                      direction="horizontal"
                      type="COLUMN"
                    >
                      {(provided) => (
                        <Box
                          className="lim-droppable-columns-wrapper"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          sx={{
                            display: "flex",
                          }}
                        >
                          {columns.map((column, columnIndex) => (
                            <Column
                              key={column._id}
                              boardId={board._id}
                              columnId={column._id}
                              columnIndex={columnIndex}
                              showAddCardsButton={true}
                              editMode={editColumnsMode}
                              onDelete={() =>
                                handleDeleteColumnClick(column._id)
                              }
                              onUpdate={handleUpdateColumn}
                            />
                          ))}
                        </Box>
                      )}
                    </Droppable>
                    {addingNewColumn ? "Adding..." : null}
                    {editColumnsMode && !isDragging ? (
                      <CreateColumnForm onSubmit={handleCreateColumn} />
                    ) : null}
                  </>
                ) : (
                  "loading columns..."
                )}
              </Box>
            </Container>
          </Box>
        </DragDropContext>
      ) : (
        "board-not-found"
      )}
    </>
  );
}
