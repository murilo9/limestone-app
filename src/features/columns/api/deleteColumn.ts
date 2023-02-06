import { delette } from "../../common/utils/http";

export const deleteColumn = (boardId: string, columnId: string) =>
  delette(`/boards/${boardId}/columns/${columnId}`);
