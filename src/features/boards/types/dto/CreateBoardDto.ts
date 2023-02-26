import { BoardSettingsDto } from "./BoardSettingsDto";

export type CreateBoardDto = {
  title: string;
  users: string[];
  columns: string[];
  settings: BoardSettingsDto;
};
