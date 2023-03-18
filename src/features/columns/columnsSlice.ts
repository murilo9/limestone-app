import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createColumn } from "./api/createColumn";
import { deleteColumn } from "./api/deleteColumn";
import { fetchColumns } from "./api/fetchColumns";
import { updateColumn } from "./api/updateColumn";
import { ColumnEntity } from "./types/ColumnEntity";
import { CreateColumnDto } from "./types/dto/CreateColumnDto";
import { UpdateColumnDto } from "./types/dto/UpdateColumnDto";

interface ColumnsState {
  entities: { [id: string]: ColumnEntity };
}

const initialState: ColumnsState = {
  entities: {},
};

export const onLoadColumns = createAsyncThunk(
  "columns/onLoadColumns",
  async (boardId: string) => {
    const fetchColumnsRes = await fetchColumns(boardId);
    const columns = fetchColumnsRes.data;
    return columns;
  }
);

export const onCreateColumn = createAsyncThunk(
  "columns/onCreateColumn",
  async ({
    boardId,
    title,
    index,
  }: {
    boardId: string;
    title: string;
    index: number;
  }) => {
    const createColumnDto: CreateColumnDto = { title, index };
    const createColumnRes = await createColumn(boardId, createColumnDto);
    const createdColumn = createColumnRes.data;
    return createdColumn;
  }
);

export const onUpdateColumn = createAsyncThunk(
  "columns/onUpdateColumn",
  async ({ boardId, column }: { boardId: string; column: ColumnEntity }) => {
    const updateColumnRes = await updateColumn(boardId, column._id, column);
    const updatedColumn = updateColumnRes.data;
    return updatedColumn;
  }
);

export const onDeleteColumn = createAsyncThunk(
  "columns/onDeleteColumn",
  async ({ boardId, columnId }: { boardId: string; columnId: string }) => {
    await deleteColumn(boardId, columnId);
    return columnId;
  }
);

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    columnUpdated(state, action: PayloadAction<ColumnEntity[]>) {
      const columns = action.payload;
      columns.forEach((column) => (state.entities[column._id] = column));
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(onLoadColumns.fulfilled, (state, action) => {
        const columns = action.payload;
        columns.forEach((column) => (state.entities[column._id] = column));
      })
      .addCase(onCreateColumn.fulfilled, (state, action) => {
        const createdColumn = action.payload;
        state.entities[createdColumn._id] = createdColumn;
      })
      .addCase(onUpdateColumn.fulfilled, (state, action) => {
        const updatedColumn = action.payload;
        state.entities[updatedColumn._id] = updatedColumn;
      })
      .addCase(onDeleteColumn.fulfilled, (state, action) => {
        const columnId = action.payload;
        delete state.entities[columnId];
      }),
});
export const { columnUpdated } = columnsSlice.actions;

export default columnsSlice.reducer;
