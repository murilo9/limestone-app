import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../../store";
import BoardCard from "../components/Board";
import BoardsHeader from "../components/BoardsHeader";
import { BoardEntity } from "../types/BoardEntity";

const filterBoardByQuery = (query: string, board: BoardEntity) =>
  board.title.toLowerCase().includes(query.toLowerCase());

export default function BoardsPage() {
  const boards = useAppSelector((state) => state.boards.entities);
  const [query, setQuery] = useState("");

  return (
    <>
      <Box
        className="lim-boards-page"
        sx={{
          px: "0 !important",
          margin: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <BoardsHeader
          query={query}
          setQuery={setQuery}
        />
        <Box
          className="lim-boards-list"
          sx={{
            width: "100%",
            flex: "1 1",
            overflowY: "auto",
            boxSizing: "border-box",
          }}
        >
          <Grid
            container
            maxWidth="xl"
            sx={{ px: { xs: 3, xl: 0 }, margin: "auto", py: 4 }}
          >
            {Object.entries(boards)
              .filter(([boardId, board]) =>
                query.trim() ? filterBoardByQuery(query.trim(), board) : true
              )
              .map(([boardId, board]) => (
                <Grid
                  item
                  xs={12}
                  key={boardId}
                >
                  <BoardCard board={board} />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
