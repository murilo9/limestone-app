import { post } from "../../common/utils/http";
import { Board } from "../types/Board";
import { CreateBoardDto } from "../types/dto/CreateBoardDto";

export const createBoard = (createBoardForm: CreateBoardDto) =>
  post<Board>("/boards", createBoardForm);
