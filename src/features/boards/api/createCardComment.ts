import { post } from "../../common/utils/http";
import { CardComment } from "../types/CardComment";
import { CreateCardCommentDto } from "../types/dto/CreateCardCommentDto";

export const createCardComment = (
  boardId: string,
  cardId: string,
  createCardForm: CreateCardCommentDto
) =>
  post<CardComment>(
    `/boards${boardId}/cards/${cardId}/comments`,
    createCardForm
  );
