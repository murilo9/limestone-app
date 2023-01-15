import { get } from "../../common/utils/http";
import { Card } from "../types/Card";

export const fetchBoardCards = (boardId: string, columnId: string) =>
  get<Card[]>(`/boards/${boardId}/columns/${columnId}/cards`);
