import { get } from "../../common/utils/http";
import { BoardEntity } from "../types/BoardEntity";

export const fetchBoards = () => get<BoardEntity[]>("/boards");
