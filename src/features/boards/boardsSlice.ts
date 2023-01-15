import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createBoard } from "./api/createBoard";
import { createCard } from "./api/createCard";
import { createCardComment } from "./api/createCardComment";
import { deleteBoard } from "./api/deleteBoard";
import { deleteCard } from "./api/deleteCard";
import { deleteCardComment } from "./api/deleteCardComment";
import { fetchAllBoards } from "./api/fetchAllBoards";
import { fetchCard } from "./api/fetchCard";
import { fetchCardComments } from "./api/fetchCardComments";
import { fetchBoardCards } from "./api/fetchColumnCards";
import { updateBoard } from "./api/updateBoard";
import { updateCard } from "./api/updateCard";
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
export const onLoadBoardColumnCards = createAsyncThunk(
  "boards/onLoadBoardColumnCards",
  async ({ boardId, columnId }: { boardId: string; columnId: string }) => {
    const columnCardsRes = await fetchBoardCards(boardId, columnId);
    const columnCards = columnCardsRes.data;
    return { boardId, columnId, cards: columnCards };
  }
);
export const fetchCardData = createAsyncThunk(
  "boards/fetchCardData",
  async ({
    boardId,
    columnId,
    cardId,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
  }) => {
    const fetchCardRes = await fetchCard(boardId, columnId, cardId);
    const card = fetchCardRes.data;
    return card;
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
export const onCreateCard = createAsyncThunk(
  "boards/onCreateCard",
  async ({
    boardId,
    columnId,
    createCardForm,
  }: {
    boardId: string;
    columnId: string;
    createCardForm: CreateCardDto;
  }) => {
    const createCardRes = await createCard(boardId, columnId, createCardForm);
    const createdCard = createCardRes.data;
    return { boardId, columnId, createdCard };
  }
);
export const onUpdateCard = createAsyncThunk(
  "boards/onUpdateCard",
  async ({
    boardId,
    columnId,
    cardId,
    updateCardForm,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
    updateCardForm: UpdateCardDto;
  }) => {
    const updateCardRes = await updateCard(
      boardId,
      columnId,
      cardId,
      updateCardForm
    );
    const updatedCard = updateCardRes.data;
    return {
      boardId,
      columnId,
      cardId,
      updatedCard,
    };
  }
);
export const onDeleteCard = createAsyncThunk(
  "boards/onDeleteCard",
  async ({
    boardId,
    columnId,
    cardId,
    updateCardForm,
  }: {
    boardId: string;
    columnId: string;
    cardId: string;
    updateCardForm: UpdateCardDto;
  }) => {
    await deleteCard(boardId, columnId, cardId);
    return {
      boardId,
      columnId,
      cardId,
    };
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
      .addCase(onLoadBoardColumnCards.fulfilled, (state, action) => {
        const { boardId, columnId, cards } = action.payload;
        cards.forEach((card) => {
          const column = state.entities[boardId].columns[columnId];
          column.cards[card._id] = card;
        });
      })
      .addCase(onCreateCard.fulfilled, (state, action) => {
        const { boardId, columnId, createdCard } = action.payload;
        state.entities[boardId].columns[columnId].cards[createdCard._id] =
          createdCard;
      })
      .addCase(onUpdateCard.fulfilled, (state, action) => {
        const { boardId, columnId, updatedCard } = action.payload;
        state.entities[boardId].columns[columnId].cards[updatedCard._id] =
          updatedCard;
      })
      .addCase(onDeleteCard.fulfilled, (state, action) => {
        const { boardId, columnId, cardId } = action.payload;
        delete state.entities[boardId].columns[columnId].cards[cardId];
      })
      .addCase(onFetchCardComments.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, comments } = action.payload;
        comments.forEach((comment) => {
          const card = state.entities[boardId].columns[columnId].cards[cardId];
          card.comments[comment._id] = comment;
        });
      })
      .addCase(onCreateCardComment.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, createdCardComment } =
          action.payload;
        state.entities[boardId].columns[columnId].cards[cardId].comments[
          createdCardComment._id
        ] = createdCardComment;
      })
      .addCase(onUpdateCardComment.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, updatedCardComment } =
          action.payload;
        state.entities[boardId].columns[columnId].cards[cardId].comments[
          updatedCardComment._id
        ] = updatedCardComment;
      })
      .addCase(onDeleteCardComment.fulfilled, (state, action) => {
        const { boardId, columnId, cardId, commentId } = action.payload;
        delete state.entities[boardId].columns[columnId].cards[cardId].comments[
          commentId
        ];
      }),
});

export default boardsSlice.reducer;
