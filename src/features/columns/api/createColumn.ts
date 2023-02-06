import { post } from "../../common/utils/http";
import { CreateColumnDto } from "../types/dto/CreateColumnDto";

export const createColumn = (boardId: string, column: CreateColumnDto) =>
  post(`/boards/${boardId}`, column);
