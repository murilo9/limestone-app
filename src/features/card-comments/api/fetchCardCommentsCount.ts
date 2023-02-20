import { get } from "../../common/utils/http";

export const fetchCardCommentsCount = (
  boardId: string,
  columnId: string,
  cardId: string
) => get<number>(`/boards/${boardId}/cards/${cardId}/comments-count`);
