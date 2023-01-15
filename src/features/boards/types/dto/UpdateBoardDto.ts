import { BoardSettingsDto } from "./BoardSettingsDto";
import { ColumnDto } from "./ColumnDto";

export type UpdateBoardDto = {
  title: string;
  owner: string;
  users: string[];
  archived: boolean;
  columns: ColumnDto[];
  settings: BoardSettingsDto;
};
