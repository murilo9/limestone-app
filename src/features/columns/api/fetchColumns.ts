import { get } from "../../common/utils/http";
import { ColumnEntity } from "../types/ColumnEntity";

export const fetchColumns = (boardId: string) =>
  get<ColumnEntity[]>(`/boards/${boardId}/columns`);
