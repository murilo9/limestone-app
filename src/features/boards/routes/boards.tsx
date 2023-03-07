import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { onLoadAllBoards } from "../boardsSlice";
import BoardCard from "../components/Board";
import BoardsHeader, {
  BOARDS_HEADER_HEIGHTS,
} from "../components/BoardsHeader";
import CreateCardModal from "../../cards/components/CreateCardModal";
import { useOutletContext } from "react-router-dom";
import { OutletContextProps } from "../../common/types/OutletContextProps";

export default function BoardsPage() {
  const boards = useAppSelector((state) => state.boards.entities);
  const { loadingBoards } = useOutletContext<OutletContextProps>();

  return (
    <>
      <Box
        className="lim-boards-page"
        sx={{
          px: "0 !important",
          margin: "auto",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <BoardsHeader />
        <Box
          className="lim-boards-list"
          sx={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            boxSizing: "border-box",
            pt: BOARDS_HEADER_HEIGHTS,
          }}
        >
          <Grid
            container
            maxWidth="xl"
            sx={{ px: { xs: 3, xl: 0 }, margin: "auto", py: 6 }}
          >
            {Object.entries(boards).map(([boardId, board]) => (
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
