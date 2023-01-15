import { put } from "../../common/utils/http";
import { Card } from "../types/Card";
import { UpdateCardDto } from "../types/dto/UpdateCardDto";

export const updateCard = (
  boardId: string,
  columnId: string,
  cardId: string,
  card: UpdateCardDto
) => put<Card>(`/boards/${boardId}/columns/${columnId}/cards/${cardId}`, card);
