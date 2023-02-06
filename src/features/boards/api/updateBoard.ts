import { put } from "../../common/utils/http";
import { BoardEntity } from "../types/BoardEntity";
import { UpdateBoardDto } from "../types/dto/UpdateBoardDto";

export const updateBoard = (boardId: string, updateBoardForm: BoardEntity) =>
  put<BoardEntity>(`/boards/${boardId}`, updateBoardForm);
