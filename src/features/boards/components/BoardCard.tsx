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
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Board } from "../types/Board";
import CardsColumn from "./CardsColumn";

type BoardCardProps = {
  board: Board;
};

export default function BoardCard({ board }: BoardCardProps) {
  const [showDetails, setShowDetails] = useState(false);

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
      {board.columns.map((column, index) => (
        <CardsColumn
          key={column._id}
          boardId={board._id}
          columnIndex={index}
        />
      ))}
    </Box>
  );

  return (
    <>
      <Card
        elevation={0}
        sx={{
          border: `1px solid rgba(90, 126, 144, 0.2)`,
          bgcolor: "rgba(0,0,0,0.01)",
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
            : board.columns.map((column) => (
                <Box
                  sx={{ display: "inline-block", pr: { xs: 4, md: 6 }, pt: 2 }}
                >
                  <Typography
                    variant="h6"
                    textAlign="right"
                  >
                    {column.cardCount}
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
    </>
  );
}
