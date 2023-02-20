import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { cardPriorityColor } from "../../cards/types/CardPriorityColor";
import { cardPriorityLabels } from "../../cards/types/CardPriorityLabels";

type CardPrioritySelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function CardPrioritySelector({
  value,
  onChange,
}: CardPrioritySelectorProps) {
  const theme = useTheme();

  return (
    <>
      <Grid
        container
        sx={{ justifyContent: "space-between" }}
      >
        {cardPriorityLabels.map((priority, index) => (
          <Box
            onClick={() => onChange(index)}
            sx={{ cursor: "pointer", py: 1, px: 1 }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "inline",
                color: value === index ? cardPriorityColor[index] : null,
                borderBottom:
                  value === index
                    ? `2px solid ${theme.palette.primary.main}`
                    : null,
              }}
            >
              {priority}
            </Typography>
          </Box>
        ))}
      </Grid>
    </>
  );
}
