import { get } from "../../common/utils/http";
import { Board } from "../types/Board";

export const fetchBoard = (boardId: string) => get<Board>(`/boards/${boardId}`);
