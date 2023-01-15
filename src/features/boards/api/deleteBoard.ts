import { DELETE } from "../../common/utils/http";

export const deleteBoard = (boardId: string) => DELETE(`/boards/${boardId}`);
