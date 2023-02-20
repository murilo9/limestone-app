import { delette } from "../../common/utils/http";

export const deleteCardComment = (
  boardId: string,
  cardId: string,
  commentId: string
) => delette(`/boards/${boardId}/cards/${cardId}/comments/${commentId}`);
