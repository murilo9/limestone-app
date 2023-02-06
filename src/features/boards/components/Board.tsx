import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { BoardEntity } from "../types/BoardEntity";
import CardsColumn from "../../columns/components/Column";
import { DragDropContext } from "react-beautiful-dnd";
import { useAppSelector } from "../../../store";

type BoardProps = {
  board: BoardEntity;
};

export default function Board({ board }: BoardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const columns = useAppSelector((state) =>
    Object.values(state.columns.entities)
      .filter((column) => column.boardId === board._id)
      .sort((columnA, columnB) => columnA.index - columnB.index)
  );

  const renderBoardDetails = () => (
    <Box
      className="lim-detailed-columns-list"
      sx={{
        width: "100%",
        whiteSpace: "nowrap",
        display: "flex",
        overflowX: "auto",
      }}
    >
      {columns.map((column) => (
        <CardsColumn
          key={column._id}
          boardId={board._id}
          columnId={column._id}
        />
      ))}
    </Box>
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
