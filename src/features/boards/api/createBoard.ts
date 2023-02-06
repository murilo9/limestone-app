import { post } from "../../common/utils/http";
import { BoardEntity } from "../types/BoardEntity";
import { CreateBoardDto } from "../types/dto/CreateBoardDto";

export const createBoard = (createBoardForm: CreateBoardDto) =>
  post<BoardEntity>("/boards", createBoardForm);
