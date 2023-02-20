import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./api/createBoard";
import { createCardComment } from "../card-comments/api/createCardComment";
import { deleteBoard } from "./api/deleteBoard";
import { fetchBoards } from "./api/fetchBoards";
import { updateBoard } from "./api/updateBoard";
import { BoardEntity } from "./types/BoardEntity";
import { CreateBoardDto } from "./types/dto/CreateBoardDto";
import { CreateCardCommentDto } from "../card-comments/types/dto/CreateCardCommentDto";

interface BoardsState {
  entities: { [id: string]: BoardEntity };
}

const initialState: BoardsState = {
  entities: {},
};

/* Thunks */

export const onLoadAllBoards = createAsyncThunk(
  "boards/onLoadAllBoards",
  async () => {
    const fetchBoardsRes = await fetchBoards();
    const boards = fetchBoardsRes.data;
    return boards;
  }
);
export const onCreateBoard = createAsyncThunk(
  "boards/onCreateBoard",
  async (createBoardForm: CreateBoardDto) => {
    const createBoardRes = await createBoard(createBoardForm);
    const createdBoard = createBoardRes.data;
    return createdBoard;
  }
);
export const onUpdateBoard = createAsyncThunk(
  "boards/onUpdateBoard",
  async (board: BoardEntity) => {
    const updateBoardRes = await updateBoard(board._id, board);
    const updatedBoard = updateBoardRes.data;
    return updatedBoard;
  }
);
export const onDeleteBoard = createAsyncThunk(
  "boards/onDeleteBoard",
  async (boardId: string) => {
    await deleteBoard(boardId);
    return boardId;
  }
);

/* Slice declaration */

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(onLoadAllBoards.fulfilled, (state, action) => {
        const boards = action.payload;
        boards.forEach((board) => {
          state.entities[board._id] = board;
        });
      })
      .addCase(onCreateBoard.fulfilled, (state, action) => {
        const createdBoard = action.payload;
        state.entities[createdBoard._id] = createdBoard;
      })
      .addCase(onUpdateBoard.fulfilled, (state, action) => {
        const updatedBoard = action.payload;
        state.entities[updatedBoard._id] = updatedBoard;
      })
      .addCase(onDeleteBoard.fulfilled, (state, action) => {
        const boardId = action.payload;
        delete state.entities[boardId];
      }),
});

export default boardsSlice.reducer;
