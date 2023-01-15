import { put } from "../../common/utils/http";
import { Board } from "../types/Board";
import { UpdateBoardDto } from "../types/dto/UpdateBoardDto";

export const updateBoard = (boardId: string, updateBoardForm: UpdateBoardDto) =>
  put<Board>(`/boards/${boardId}`, updateBoardForm);
