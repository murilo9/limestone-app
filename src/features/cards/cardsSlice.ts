import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createCard } from "./api/createCard";
import { deleteCard } from "./api/deleteCard";
import { fetchCards } from "./api/fetchCards";
import { CardEntity } from "./types/CardEntity";
import { CreateCardDto } from "./types/dto/CreateCardDto";

interface CardsState {
  entities: { [id: string]: CardEntity };
  createCardForBoardId: string | null;
  createCardForColumnId: string | null;
  selectedCardId: string | null;
}

const initialState: CardsState = {
  entities: {},
  createCardForBoardId: null,
  createCardForColumnId: null,
  selectedCardId: null,
};

export const onFetchCards = createAsyncThunk(
  "cards/onFetchCards",
  async ({ columnId, boardId }: { columnId: string; boardId: string }) => {
    const fetchCardsRes = await fetchCards(boardId, columnId);
    const cards = fetchCardsRes.data;
    return cards;
  }
);

export const onCreateCard = createAsyncThunk(
  "cards/onCreateCard",
  async ({
    columnId,
    boardId,
    createCardDto,
  }: {
    columnId: string;
    boardId: string;
    createCardDto: CreateCardDto;
  }) => {
    const createCardRes = await createCard(boardId, columnId, createCardDto);
    const card = createCardRes.data;
    return card;
  }
);

export const onDeleteCard = createAsyncThunk(
  "cards/onDeleteCard",
  async ({
    columnId,
    boardId,
    cardId,
  }: {
    columnId: string;
    boardId: string;
    cardId: string;
  }) => {
    await deleteCard(boardId, columnId, cardId);
    return cardId;
  }
);

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    createCardModalClosed(state, action: PayloadAction<void>) {
      state.createCardForBoardId = null;
      state.createCardForColumnId = null;
    },
    createCardModalOpened(
      state,
      action: PayloadAction<{ boardId: string; columnId: string }>
    ) {
      const { boardId, columnId } = action.payload;
      state.createCardForBoardId = boardId;
      state.createCardForColumnId = columnId;
    },
    cardSelected(state, action: PayloadAction<string | null>) {
      const cardId = action.payload;
      state.selectedCardId = cardId;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(onFetchCards.fulfilled, (state, action) => {
        const cards = action.payload;
        cards.forEach((card) => (state.entities[card._id] = card));
      })
      .addCase(onCreateCard.fulfilled, (state, action) => {
        const card = action.payload;
        state.entities[card._id] = card;
      })
      .addCase(onDeleteCard.fulfilled, (state, action) => {
        const deletedCardId = action.payload;
        delete state.entities[deletedCardId];
      }),
});

export const { createCardModalClosed, createCardModalOpened, cardSelected } =
  cardsSlice.actions;

export default cardsSlice.reducer;
