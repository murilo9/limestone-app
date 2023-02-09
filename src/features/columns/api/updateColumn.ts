import { put } from "../../common/utils/http";
import { ColumnEntity } from "../types/ColumnEntity";
import { UpdateColumnDto } from "../types/dto/UpdateColumnDto";

export const updateColumn = (
  boardId: string,
  columnId: string,
  column: UpdateColumnDto
) => put<ColumnEntity>(`/boards/${boardId}/columns/${columnId}`, column);
