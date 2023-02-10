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
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { BoardEntity } from "../types/BoardEntity";
import Column from "../../columns/components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  onCreateColumn,
  onDeleteColumn,
  onFetchColumns,
  onUpdateColumn,
} from "../../columns/columnsSlice";
import NewColumnForm from "../../columns/components/NewColumnForm";
import { UpdateColumnDto } from "../../columns/types/dto/UpdateColumnDto";

type BoardProps = {
  board: BoardEntity;
};

export default function Board({ board }: BoardProps) {
  const [showDetails, setShowDetails] = useState(true);
  const [loadingColumns, setLoadingColumns] = useState(false);
  const [addingNewColumn, setAddingNewColumn] = useState(false);
  const [editColumnsMode, setEditColumnsMode] = useState(false);
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) =>
    Object.values(state.columns.entities)
      .filter((column) => column.boardId === board._id)
      .sort((columnA, columnB) => columnA.index - columnB.index)
  );

  // Loads this board's columns on start
  useLayoutEffect(() => {
    setLoadingColumns(true);
    dispatch(onFetchColumns(board._id)).then(() => {});
  }, []);

  const createColumn = (columnTitle: string) => {
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

  const deleteColumn = (columnId: string) => {
    dispatch(onDeleteColumn({ boardId: board._id, columnId }));
  };

  const updateColumn = (updateColumnDto: UpdateColumnDto, columnId: string) => {
    dispatch(onUpdateColumn({ boardId: board._id, columnId, updateColumnDto }));
  };

  const renderBoardDetails = () => (
    <>
      <Box
        className="lim-column-toolbar"
        sx={{ mb: 2 }}
      >
        <Box>
          <Switch
            size="small"
            value={editColumnsMode}
            onChange={(event) => setEditColumnsMode(event.target.checked)}
          />
          <Typography
            variant="body2"
            sx={{ display: "inline-block" }}
          >
            Edit columns
          </Typography>
        </Box>
      </Box>
      <Box
        className="lim-detailed-columns-list"
        sx={{
          width: "100%",
          whiteSpace: "nowrap",
          display: "flex",
          overflowX: "auto",
        }}
      >
        {loadingColumns ? (
          <>
            {columns.map((column) => (
              <Column
                key={column._id}
                boardId={board._id}
                columnId={column._id}
                showAddCardsButton={false}
                editMode={editColumnsMode}
                onDelete={() => deleteColumn(column._id)}
                onUpdate={(updateColumnDto) =>
                  updateColumn(updateColumnDto, column._id)
                }
              />
            ))}
            {addingNewColumn ? "Adding..." : null}
            {editColumnsMode ? <NewColumnForm onSubmit={createColumn} /> : null}
          </>
        ) : (
          "loading..."
        )}
      </Box>
    </>
  );

  return (
    <>
      <DragDropContext onDragEnd={(par: any) => console.log("onDragEnd", par)}>
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
              <IconButton>
                <MoreHoriz />
              </IconButton>
            }
            title={board.title}
            titleTypographyProps={{
              sx: {
                color: "#000000",
              },
              variant: "subtitle1",
            }}
            subheaderTypographyProps={{
              variant: "caption",
              sx: { color: "#9FB5B8" },
            }}
            subheader={`Last updated at ${new Date(
              board.updated
            ).toDateString()}`}
          />
          {/* USAR TABLE */}
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
