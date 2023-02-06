import { CreateCardDto } from "../types/dto/CreateCardDto";
import { post } from "../../common/utils/http";
import { CardEntity } from "../types/CardEntity";

export const createCard = (
  boardId: string,
  columnId: string,
  createCardDto: CreateCardDto
) =>
  post<CardEntity>(
    `/boards/${boardId}/columns/${columnId}/cards`,
    createCardDto
  );
