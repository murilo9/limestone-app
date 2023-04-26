import React, { ReactElement, ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { limestoneTheme } from "./theme";
import { Store } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// Needed to test draggable components
export const DroppableProvider = ({ children }: { children: ReactNode }) => {
  return (
    <Droppable droppableId="droppable-id">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
        </div>
      )}
    </Droppable>
  );
};

const AllTheProviders =
  (store: Store) =>
  ({ children }: { children: ReactNode }) => {
    return (
      <ThemeProvider theme={limestoneTheme}>
        <Provider store={store}>
          <DragDropContext onDragEnd={() => {}}>{children}</DragDropContext>
        </Provider>
      </ThemeProvider>
    );
  };

const customRender = (
  ui: ReactElement,
  store: Store,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders(store), ...options });

export * from "@testing-library/react";
export { customRender as render };
