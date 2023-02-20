import { Typography } from "@mui/material";
import React from "react";
import { cardPriorityColor } from "../types/CardPriorityColor";
import { cardPriorityLabels } from "../types/CardPriorityLabels";

type CardPriorityDisplayProps = {
  priority: number;
};

export default function CardPriorityDisplay({
  priority,
}: CardPriorityDisplayProps) {
  return (
    <>
      <Typography
        variant="body2"
        color={cardPriorityColor[priority]}
        sx={{ mt: 2 }}
      >
        {cardPriorityLabels[priority]}
      </Typography>
    </>
  );
}
