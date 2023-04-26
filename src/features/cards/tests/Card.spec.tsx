import { Box } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import store from "../../../store";
import { DroppableProvider, render, screen } from "../../../test-utils";
import Card from "../components/Card";
import { CardEntity } from "../types/CardEntity";

const cardData: CardEntity = {
  columnId: "column-id",
  title: "Fix bug",
  index: 0,
  assignee: null,
  priority: 1,
  description: "Fix this right now",
  _id: "card-id",
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
};

it("renders learn react link", () => {
  render(
    <DroppableProvider>
      <Card
        card={cardData}
        cardIndex={0}
        boardId={"board-id"}
      />
    </DroppableProvider>,
    store
  );

  const titleElement = screen.getByText(cardData.title);
  expect(titleElement).toBeInTheDocument();
});
