import { post } from "../../common/utils/http";
import { ColumnEntity } from "../types/ColumnEntity";
import { CreateColumnDto } from "../types/dto/CreateColumnDto";

export const createColumn = (boardId: string, column: CreateColumnDto) =>
  post<ColumnEntity>(`/boards/${boardId}/columns`, column);
