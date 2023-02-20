import { PersistentEntity } from "../../common/types/PersistentEntity";

export interface CardCommentEntity extends PersistentEntity {
  author: string;
  body: string;
  cardId: string;
}
