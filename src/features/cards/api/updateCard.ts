import { put } from "../../common/utils/http";
import { CardEntity } from "../types/CardEntity";
import { UpdateCardDto } from "../types/dto/UpdateCardDto";

export const updateCard = (
  boardId: string,
  columnId: string,
  cardId: string,
  card: UpdateCardDto
) =>
  put<CardEntity>(
    `/boards/${boardId}/columns/${columnId}/cards/${cardId}`,
    card
  );
