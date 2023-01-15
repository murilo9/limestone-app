import { DELETE } from "../../common/utils/http";

export const deleteCard = (boardId: string, columnId: string, cardId: string) =>
  DELETE(`/boards/${boardId}/columns/${columnId}/cards/${cardId}`);
