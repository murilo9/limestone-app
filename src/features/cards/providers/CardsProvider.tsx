import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../../store";
import CreateCardModal from "../../boards/components/CreateCardModal";

type CardsProviderProps = {
  children?: ReactNode;
};

export const CardsContext = createContext({
  createCardForBoardId: null as string | null,
  createCardForColumnId: null as string | null,
  onOpenCreateCardModal: (boardId: string, columnId: string) => {},
  onCloseCreateCardModal: () => {},
});

export default function CardsProvider({ children }: CardsProviderProps) {
  const [createCardForColumnId, setCreateCardForColumnId] = useState<
    string | null
  >(null);
  const [createCardForBoardId, setCreateCardForBoardId] = useState<
    string | null
  >(null);

  const onOpenCreateCardModal = (boardId: string, columnId: string) => {
    setCreateCardForBoardId(boardId);
    setCreateCardForColumnId(columnId);
  };

  const onCloseCreateCardModal = () => {
    setCreateCardForBoardId(null);
    setCreateCardForColumnId(null);
  };

  const contextValue = {
    createCardForBoardId,
    createCardForColumnId,
    onCloseCreateCardModal,
    onOpenCreateCardModal,
  };

  return (
    <>
      <CardsContext.Provider value={contextValue}>
        {children}
        <CreateCardModal />
      </CardsContext.Provider>
    </>
  );
}
