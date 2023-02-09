import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./api/createBoard";
import { createCardComment } from "./api/createCardComment";
import { deleteBoard } from "./api/deleteBoard";
import { deleteCardComment } from "./api/deleteCardComment";
import { fetchBoards } from "./api/fetchBoards";
import { fetchCardComments } from "./api/fetchCardComments";
import { fetchCardCommentsCount } from "./api/fetchCardCommentsCount";
import { updateBoard } from "./api/updateBoard";
import { updateCardComment } from "./api/updateCardComment";
import { BoardEntity } from "./types/BoardEntity";
import { CreateBoardDto } from "./types/dto/CreateBoardDto";
import { CreateCardCommentDto } from "./types/dto/CreateCardCommentDto";

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

// TODO: mover esta parte pro slice de card comments

export const onFetchCardComments = createAsyncThunk(
  "boards/onFetchCardComments",
  async ({
    boardId,
    columnId,
    cardId,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
  }) => {
    const fetchCardCommentsRes = await fetchCardComments(boardId, cardId);
    const comments = fetchCardCommentsRes.data;
    return { boardId, columnId, cardId, comments };
  }
);
export const onCreateCardComment = createAsyncThunk(
  "boards/onCreateCardComment",
  async ({
    boardId,
    columnId,
    cardId,
    createCardCommentForm,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
    createCardCommentForm: CreateCardCommentDto;
  }) => {
    const createCardCommentRes = await createCardComment(
      boardId,
      cardId,
      createCardCommentForm
    );
    const createdCardComment = createCardCommentRes.data;
    return {
      boardId,
      columnId,
      cardId,
      createdCardComment,
    };
  }
);
export const onUpdateCardComment = createAsyncThunk(
  "boards/onUpdateCardComment",
  async ({
    boardId,
    columnId,
    cardId,
    commentId,
    updateCardCommentForm,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
    commentId: string;
    updateCardCommentForm: CreateCardCommentDto;
  }) => {
    const updateCardCommentRes = await updateCardComment(
      boardId,
      cardId,
      commentId,
      updateCardCommentForm
    );
    const updatedCardComment = updateCardCommentRes.data;
    return {
      boardId,
      columnId,
      cardId,
      commentId,
      updatedCardComment,
    };
  }
);

export const onDeleteCardComment = createAsyncThunk(
  "boards/onDeleteCardComment",
  async ({
    boardId,
    columnId,
    cardId,
    commentId,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
    commentId: string;
  }) => {
    await deleteCardComment(boardId, cardId, commentId);
    return {
      boardId,
      columnId,
      cardId,
      commentId,
    };
  }
);

export const onFetchCardCommentsCount = createAsyncThunk(
  "boards/onFetchCardCommentsCount",
  async ({
    boardId,
    columnId,
    cardId,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
  }) => {
    const fetchCardCommentsCountRes = await fetchCardCommentsCount(
      boardId,
      columnId,
      cardId
    );
    const count = fetchCardCommentsCountRes.data;
    return { boardId, columnId, cardId, count };
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
