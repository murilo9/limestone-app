import { get } from "../../common/utils/http";
import { CardCommentEntity } from "../types/CardComment";

export const fetchCardComments = (boardId: string, cardId: string) =>
  get<CardCommentEntity[]>(`/boards/${boardId}/cards/${cardId}`);
