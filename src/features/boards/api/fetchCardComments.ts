import { get } from "../../common/utils/http";
import { CardComment } from "../types/CardComment";

export const fetchCardComments = (boardId: string, cardId: string) =>
  get<CardComment[]>(`/boards/${boardId}/cards/${cardId}`);
