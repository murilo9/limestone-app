import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import boardsSlice from "./features/boards/boardsSlice";
import cardCommentsSlice from "./features/card-comments/cardCommentsSlice";
import cardsSlice from "./features/cards/cardsSlice";
import columnsSlice from "./features/columns/columnsSlice";
import commonSlice from "./features/common/commonSlice";
import usersSlice from "./features/users/usersSlice";

const store = configureStore({
  reducer: {
    common: commonSlice,
    boards: boardsSlice,
    columns: columnsSlice,
    cards: cardsSlice,
    users: usersSlice,
    cardComments: cardCommentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// These two are will be used inside the actual components:
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
