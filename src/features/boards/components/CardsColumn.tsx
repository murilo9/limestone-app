import { Add } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { onLoadBoardColumnCards } from "../boardsSlice";
import { BoardColumn } from "../types/BoardColumn";
import CardCard from "./CardCard";

type BoardColumnProps = {
  boardId: string;
  columnIndex: number;
};

export default function CardsColumn({
  boardId,
  columnIndex,
}: BoardColumnProps) {
  const [loadingCards, setLoadingCards] = useState(false);
  const column = useAppSelector(
    (state) => state.boards.entities[boardId].columns[columnIndex]
  );
  const dispatch = useAppDispatch();
  const cards = Object.values(column.cards || {});

  useLayoutEffect(() => {
    setLoadingCards(true);
    dispatch(onLoadBoardColumnCards({ boardId, columnId: column._id }))
      .then(() => {})
      .finally(() => setLoadingCards(false));
  }, []);

  return (
    <>
      <Box
        className="lim-cards-column"
        sx={{
          width: "240px",
          display: "inline-block",
          "&:not(:last-child)": { mr: 2 },
          pb: 2,
          flex: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2">{column.title}</Typography>
          <IconButton color="primary">
            <Add />
          </IconButton>
        </Box>
        {loadingCards ? (
          "loading..."
        ) : cards.length ? (
          cards.map((card) => <CardCard card={card} />)
        ) : (
          <Typography
            variant="body1"
            textAlign="center"
            sx={{ fontStyle: "italic" }}
          >
            Empty
          </Typography>
        )}
      </Box>
    </>
  );
}
