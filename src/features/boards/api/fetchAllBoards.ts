import { get } from "../../common/utils/http";
import { Board } from "../types/Board";

export const fetchAllBoards = () => get<Board[]>("/boards");
