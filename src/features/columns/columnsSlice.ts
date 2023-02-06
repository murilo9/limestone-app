import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchColumns } from "./api/fetchColumns";
import { ColumnEntity } from "./types/ColumnEntity";

interface ColumnsState {
  entities: { [id: string]: ColumnEntity };
}

const initialState: ColumnsState = {
  entities: {},
};

const onFetchColumns = createAsyncThunk(
  "columns/onFetchColumns",
  async (boardId: string) => {
    const fetchColumnsRes = await fetchColumns(boardId);
    const columns = fetchColumnsRes.data;
    return columns;
  }
);

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(onFetchColumns.fulfilled, (state, action) => {
      const columns = action.payload;
      columns.forEach((column) => (state.entities[column._id] = column));
    }),
});

export default columnsSlice.reducer;
