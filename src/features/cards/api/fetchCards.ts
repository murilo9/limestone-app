import { get } from "../../common/utils/http";
import { CardEntity } from "../types/CardEntity";

export const fetchCards = (boardId: string, columnId: string) =>
  get<CardEntity[]>(`/boards/${boardId}/columns/${columnId}/cards`);
