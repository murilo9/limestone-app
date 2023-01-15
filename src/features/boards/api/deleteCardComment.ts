import { DELETE } from "../../common/utils/http";

export const deleteCardComment = (
  boardId: string,
  cardId: string,
  commentId: string
) => DELETE(`/boards/${boardId}/cards/${cardId}/comments/${commentId}`);
