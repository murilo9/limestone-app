import { PersistentEntity } from "../../common/types/PersistentEntity";
import { Card } from "./Card";

export interface BoardColumn
  extends Omit<PersistentEntity, "created" | "updated"> {
  title: string;
  cardCount: number;
  cards: { [id: string]: Card };
}
