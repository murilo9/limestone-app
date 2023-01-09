import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Board } from "./types/Board";

interface BoardsState {
  entities: { [id: string]: Board };
}

const initialState: BoardsState = {
  entities: {},
};

/* Thunks */

export const loadAllBoards = createAsyncThunk(
  "boards/fetchAllBoards",
  async () => {}
);
export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async () => {}
);
export const updateBoardloadAllBoards = createAsyncThunk(
  "boards/updateBoardloadAllBoards",
  async () => {}
);
export const fetchSomeBoardColumnCards = createAsyncThunk(
  "boards/fetchSomeBoardColumnCards",
  async () => {}
);
export const fetchCardData = createAsyncThunk(
  "boards/fetchCardData",
  async () => {}
);
export const fetchSomeCardComments = createAsyncThunk(
  "boards/fetchSomeCardComments",
  async () => {}
);
export const addCard = createAsyncThunk("boards/addCard", async () => {});
export const addComment = createAsyncThunk("boards/addComment", async () => {});
export const updateComment = createAsyncThunk(
  "boards/updateComment",
  async () => {}
);

/* Slice declaration */

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    boardsAdded(state, action) {},
    boardUpdated(state, action) {},
  },
});

export default boardsSlice.reducer;
