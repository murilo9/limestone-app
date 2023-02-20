import { put } from "../../common/utils/http";
import { CardCommentEntity } from "../types/CardComment";
import { CreateCardCommentDto } from "../types/dto/CreateCardCommentDto";

export const updateCardComment = (
  boardId: string,
  cardId: string,
  commentId: string,
  card: CreateCardCommentDto
) =>
  put<CardCommentEntity>(
    `/boards/${boardId}/cards/${cardId}/comments/${commentId}`,
    card
  );
