import { post } from "../../common/utils/http";
import { CardCommentEntity } from "../types/CardComment";
import { CreateCardCommentDto } from "../types/dto/CreateCardCommentDto";

export const createCardComment = (
  boardId: string,
  cardId: string,
  createCardForm: CreateCardCommentDto
) =>
  post<CardCommentEntity>(
    `/boards/${boardId}/cards/${cardId}/comments`,
    createCardForm
  );
