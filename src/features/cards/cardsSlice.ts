import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCard } from "./api/createCard";
import { fetchCards } from "./api/fetchCards";
import { CardEntity } from "./types/CardEntity";
import { CreateCardDto } from "./types/dto/CreateCardDto";

interface CardsState {
  entities: { [id: string]: CardEntity };
}

const initialState: CardsState = {
  entities: {},
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

export const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(onFetchCards.fulfilled, (state, action) => {
        const cards = action.payload;
        cards.forEach((card) => (state.entities[card._id] = card));
      })
      .addCase(onCreateCard.fulfilled, (state, action) => {
        const card = action.payload;
        state.entities[card._id] = card;
      }),
});

export default cardsSlice.reducer;
