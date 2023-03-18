import { DropResult, OnDragEndResponder } from "react-beautiful-dnd";
import { useAppDispatch, useAppSelector } from "../../../store";
import { cardUpdated, onUpdateCard } from "../../cards/cardsSlice";
import { CardEntity } from "../../cards/types/CardEntity";

export default function useOnCardDragEnd(
  boardId: string,
  setIsDragging: (isDragging: boolean) => void
) {
  const dispatch = useAppDispatch();
  const allCards = useAppSelector((state) => state.cards.entities);
  const getCardsByColumn = (columnId: string) =>
    Object.values(allCards)
      .filter((card) => card.columnId === columnId)
      .sort((cardA, cardB) => cardA.index - cardB.index);

  const reorder = <T>(
    list: Array<T>,
    startIndex: number,
    endIndex: number
  ): Array<T> => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleCardDrag = (par: DropResult) => {
    if (!par.destination) {
      return;
    }
    const sourceColumnId = par.source.droppableId.split("column_")[1];
    const sourceIndex = par.source.index;
    const targetColumnId = par.destination.droppableId.split("column_")[1];
    const targetIndex = par.destination.index as number;
    const updatedCards: CardEntity[] = [];
    // If updating cards on the same column
    if (targetColumnId === sourceColumnId) {
      const columnCards = getCardsByColumn(sourceColumnId);
      // Sort cards
      const sortedCards = reorder(columnCards, sourceIndex, targetIndex);
      // Update cards indexes
      sortedCards.forEach((card, index) =>
        updatedCards.push({
          ...card,
          index,
        })
      );
    }
    // If updating cards on different columns
    else {
      const sourceColumnCards = getCardsByColumn(sourceColumnId);
      const targetColumnCards = getCardsByColumn(targetColumnId);
      const [removed] = sourceColumnCards.splice(sourceIndex, 1);
      targetColumnCards.splice(targetIndex, 0, removed);
      targetColumnCards.forEach((card, index) =>
        updatedCards.push({
          ...card,
          index,
          columnId: targetColumnId,
        })
      );
      sourceColumnCards.forEach((card, index) =>
        updatedCards.push({
          ...card,
          index,
          columnId: sourceColumnId,
        })
      );
    }
    // Update cards on redux store
    dispatch(cardUpdated(updatedCards));
    // Update all the cards on the server, in parallel
    updatedCards.forEach((card) =>
      dispatch(
        onUpdateCard({
          boardId,
          columnId: card.columnId,
          card,
          updateLocal: false, // No need to update on store again
        })
      )
    );
  };

  const handleColumnDrag = (par: DropResult) => {
    // TODO
  };

  const onDragEnd: OnDragEndResponder = (par) => {
    if (!par.destination) {
      return;
    }
    setIsDragging(false);
    console.log(par);
    const droppablePrefix = par.destination.droppableId.split("_")[0];
    if (droppablePrefix === "column") {
      handleCardDrag(par);
    } else if (droppablePrefix === "board") {
      handleColumnDrag(par);
    }
  };
  return onDragEnd;
}
