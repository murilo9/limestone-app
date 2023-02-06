import { delette } from "../../common/utils/http";

export const deleteCard = (boardId: string, columnId: string, cardId: string) =>
  delette(`/boards/${boardId}/columns/${columnId}/cards/${cardId}`);
