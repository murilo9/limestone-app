import { OnDragEndResponder } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { cardUpdated, onUpdateCard } from "../../cards/cardsSlice";
import { CardEntity } from "../../cards/types/CardEntity";

export default function useOnDragEnd(boardId: string) {
  const dispatch = useAppDispatch();
  const allCards = useAppSelector((state) => state.cards.entities);

  const onDragEnd: OnDragEndResponder = (par) => {
    const cardId = par.draggableId;
    // const sourceColumnId = par.source.droppableId;
    const targetColumnId = par.destination?.droppableId || "no-id";
    const targetColumnIndex = par.destination?.index as number;
    const updatedCard: CardEntity = {
      ...allCards[cardId],
      columnId: targetColumnId,
      assignee: null,
      index: targetColumnIndex,
    };
    dispatch(cardUpdated(updatedCard));
    dispatch(
      onUpdateCard({
        boardId,
        columnId: updatedCard.columnId,
        card: updatedCard,
      })
    );
  };
  return onDragEnd;
}
