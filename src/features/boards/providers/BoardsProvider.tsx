import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../../store";

type BoardsProviderProps = {
  children?: ReactNode;
};

export const BoardsContext = createContext({
  createCardForBoardId: null as string | null,
  createCardForColumnId: null as string | null,
  onOpenCreateCardModal: (boardId: string, columnId: string) => {},
  onCloseCreateCardModal: () => {},
});

export default function BoardsProvider({ children }: BoardsProviderProps) {
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
      <BoardsContext.Provider value={contextValue}>
        {children}
      </BoardsContext.Provider>
    </>
  );
}
