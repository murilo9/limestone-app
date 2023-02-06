import { put } from "../../common/utils/http";
import { UpdateColumnDto } from "../types/dto/UpdateColumnDto";

export const updateColumn = (
  boardId: string,
  columnId: string,
  column: UpdateColumnDto
) => put(`/boards/${boardId}/columns/${columnId}`, column);
