import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCardCommentDto } from "./types/dto/CreateCardCommentDto";
import { deleteCardComment } from "./api/deleteCardComment";
import { fetchCardComments } from "./api/fetchCardComments";
import { fetchCardCommentsCount } from "./api/fetchCardCommentsCount";
import { updateCardComment } from "./api/updateCardComment";
import { CardCommentEntity } from "./types/CardComment";
import { createCardComment } from "./api/createCardComment";

interface CardsState {
  entities: { [id: string]: CardCommentEntity };
}

const initialState: CardsState = {
  entities: {},
};

/* Thunks */

export const onFetchCardComments = createAsyncThunk(
  "boards/onFetchCardComments",
  async ({ boardId, cardId }: { boardId: string; cardId: string }) => {
    const fetchCardCommentsRes = await fetchCardComments(boardId, cardId);
    const comments = fetchCardCommentsRes.data;
    return comments;
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
    return createdCardComment;
  }
);
export const onUpdateCardComment = createAsyncThunk(
  "boards/onUpdateCardComment",
  async ({
    boardId,
    cardId,
    commentId,
    updateCardCommentForm,
  }: {
    boardId: string;
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
    return updatedCardComment;
  }
);
export const onDeleteCardComment = createAsyncThunk(
  "boards/onDeleteCardComment",
  async ({
    boardId,
    cardId,
    cardCommentId,
  }: {
    boardId: string;
    cardId: string;
    cardCommentId: string;
  }) => {
    await deleteCardComment(boardId, cardId, cardCommentId);
    return cardCommentId;
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

export const cardCommentsSlice = createSlice({
  name: "card-comments",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(onFetchCardComments.fulfilled, (state, action) => {
        const comments = action.payload;
        comments.forEach((comment) => (state.entities[comment._id] = comment));
      })
      .addCase(onCreateCardComment.fulfilled, (state, action) => {
        const card = action.payload;
        state.entities[card._id] = card;
      })
      .addCase(onDeleteCardComment.fulfilled, (state, action) => {
        const deletedCommentId = action.payload;
        delete state.entities[deletedCommentId];
      }),
});

export default cardCommentsSlice.reducer;
