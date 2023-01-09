import { PersistentEntity } from "../../common/types/PersistentEntity";

export interface Card extends PersistentEntity {
  columnId: string;
  title: string;
  assignee: string | null;
  priority: number;
}
