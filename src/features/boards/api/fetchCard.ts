import { get } from "../../common/utils/http";

export const fetchCard = (boardId: string, columnId: string, cardId: string) =>
  get(`/boards/${boardId}/columns/${columnId}/cards/${cardId}`);
