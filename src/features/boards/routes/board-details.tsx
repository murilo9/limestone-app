import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
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
import NewColumnForm from "../../columns/components/NewColumnForm";
import { UpdateColumnDto } from "../../columns/types/dto/UpdateColumnDto";
import { confirmationDialogOpened } from "../../common/commonSlice";
import { onLoadAllBoards } from "../boardsSlice";
import BoardDetailsHeader from "../components/BoardDetailsHeader";
import { BoardEntity } from "../types/BoardEntity";

export default function BoardDetailsPage() {
  const dispatch = useAppDispatch();
  const { boardId } = useParams();
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [editColumnsMode, setEditColumnsMode] = useState(false);
  // TODO: mover esta flag para a store, tanto aqui quanto no component Board
  const [addingNewColumn, setAddingNewColumn] = useState(false);

  const board: BoardEntity | undefined = useAppSelector(
    (state) => state.boards.entities[boardId || ""]
  );
  const columns = useAppSelector((state) =>
    Object.values(state.columns.entities).filter(
      (column) => column.boardId === boardId
    )
  );

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

  const handleUpdateColumn = (
    updateColumnDto: UpdateColumnDto,
    columnId: string
  ) => {
    dispatch(onUpdateColumn({ boardId: board._id, columnId, updateColumnDto }));
  };

  /* TODO: tratar board não encontrada pelo id (redirecionar) */

  return (
    <>
      {loadingBoard ? (
        "loading..."
      ) : board ? (
        <DragDropContext
          onDragEnd={(par: any) => console.log("onDragEnd", par)}
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
                py: 6,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Breadcrumbs
                aria-label="breadcrumb"
                sx={{ mb: 4 }}
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
                boardTitle={board.title}
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
                    {columns.map((column) => (
                      <Column
                        key={column._id}
                        boardId={board._id}
                        columnId={column._id}
                        showAddCardsButton={true}
                        editMode={editColumnsMode}
                        onDelete={() => handleDeleteColumnClick(column._id)}
                        onUpdate={(updateColumnDto) =>
                          handleUpdateColumn(updateColumnDto, column._id)
                        }
                      />
                    ))}
                    {addingNewColumn ? "Adding..." : null}
                    {editColumnsMode ? (
                      <NewColumnForm onSubmit={handleCreateColumn} />
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
