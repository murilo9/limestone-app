import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./api/createBoard";
import { createCardComment } from "./api/createCardComment";
import { deleteBoard } from "./api/deleteBoard";
import { deleteCardComment } from "./api/deleteCardComment";
import { fetchAllBoards } from "./api/fetchAllBoards";
import { fetchCardComments } from "./api/fetchCardComments";
import { fetchCardCommentsCount } from "./api/fetchCardCommentsCount";
import { updateBoard } from "./api/updateBoard";
import { updateCardComment } from "./api/updateCardComment";
import { Board } from "./types/Board";
import { CreateBoardDto } from "./types/dto/CreateBoardDto";
import { CreateCardCommentDto } from "./types/dto/CreateCardCommentDto";
import { CreateCardDto } from "./types/dto/CreateCardDto";
import { UpdateBoardDto } from "./types/dto/UpdateBoardDto";
import { UpdateCardDto } from "./types/dto/UpdateCardDto";

interface BoardsState {
  entities: { [id: string]: Board };
}

const initialState: BoardsState = {
  entities: {},
};

/* Thunks */

export const onLoadAllBoards = createAsyncThunk(
  "boards/fetchAllBoards",
  async () => {
    const fetchBoardsRes = await fetchAllBoards();
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
  async ({
    boardId,
    updateBoardForm,
  }: {
    boardId: string;
    updateBoardForm: UpdateBoardDto;
  }) => {
    const updateBoardRes = await updateBoard(boardId, updateBoardForm);
    const updatedBoard = updateBoardRes.data;
    return updatedBoard;
  }
);
const onDeleteBoard = createAsyncThunk(
  "/boards/onDeleteBoard",
  async (boardId: string) => {
    await deleteBoard(boardId);
    return boardId;
  }
);
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

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    upsertBoards(state, action: PayloadAction<Board[]>) {
      action.payload.forEach(
        (board) => (state.entities[board._id] = { ...board })
      );
    },
  },
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
      })
      .addCase(onFetchCardComments.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, comments } = action.payload;
        const columnIndex = state.entities[boardId].columns.findIndex(
          (column) => column._id === columnId
        );
        let cards = state.entities[boardId].columns[columnIndex].cards;
        cards = cards || [];
        const card = cards.find((someCard) => someCard._id === cardId);
        if (card) {
          comments.forEach((comment) => {
            card.comments[comment._id] = comment;
          });
        }
      })
      .addCase(onCreateCardComment.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, createdCardComment } =
          action.payload;
        const columnIndex = state.entities[boardId].columns.findIndex(
          (column) => column._id === columnId
        );
        let cards = state.entities[boardId].columns[columnIndex].cards;
        cards = cards || {};
        cards = cards || [];
        const card = cards.find((someCard) => someCard._id === cardId);
        if (card) {
          card.comments[createdCardComment._id] = createdCardComment;
        }
      })
      .addCase(onUpdateCardComment.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, updatedCardComment } =
          action.payload;
        const columnIndex = state.entities[boardId].columns.findIndex(
          (column) => column._id === columnId
        );
        let cards = state.entities[boardId].columns[columnIndex].cards;
        cards = cards || {};
        const card = cards.find((someCard) => someCard._id === cardId);
        if (card) {
          card.comments[updatedCardComment._id] = updatedCardComment;
        }
      })
      .addCase(onDeleteCardComment.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, commentId } = action.payload;
        const columnIndex = state.entities[boardId].columns.findIndex(
          (column) => column._id === columnId
        );
        let cards = state.entities[boardId].columns[columnIndex].cards;
        cards = cards || {};
        const card = cards.find((someCard) => someCard._id === cardId);
        if (card) {
          delete card.comments[commentId];
        }
      })
      .addCase(onFetchCardCommentsCount.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, count } = action.payload;
        const columnIndex = state.entities[boardId].columns.findIndex(
          (column) => column._id === columnId
        );
        const cards = state.entities[boardId].columns[columnIndex].cards;
        const card = cards.find((someCard) => someCard._id === cardId);
        if (card) {
          card.commentsCount = count;
        }
      }),
});

export default boardsSlice.reducer;
