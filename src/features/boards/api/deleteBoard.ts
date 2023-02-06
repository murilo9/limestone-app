import { delette } from "../../common/utils/http";

export const deleteBoard = (boardId: string) => delette(`/boards/${boardId}`);
