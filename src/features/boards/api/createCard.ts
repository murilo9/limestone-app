import { post } from "../../common/utils/http";
import { Card } from "../types/Card";
import { CreateCardDto } from "../types/dto/CreateCardDto";

export const createCard = (
  boardId: string,
  columnId: string,
  createCardForm: CreateCardDto
) => post<Card>(`/board/${boardId}/columns/${columnId}/cards`, createCardForm);
