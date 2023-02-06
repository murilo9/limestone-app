import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

type CardPrioritySelectorProps = {
  value: number;
  onChange: (value: number) => void;
};

const priorityColor = {
  Low: null,
  Medium: "green",
  High: "orange",
  "Very High": "red",
} as { [key: string]: string | null };

export default function CardPrioritySelector({
  value,
  onChange,
}: CardPrioritySelectorProps) {
  const theme = useTheme();
  const priorities = ["Low", "Medium", "High", "Very High"];

  return (
    <>
      <Grid
        container
        sx={{ justifyContent: "space-between" }}
      >
        {priorities.map((priority, index) => (
          <Box
            onClick={() => onChange(index)}
            sx={{ cursor: "pointer", py: 1, px: 1 }}
          >
            <Typography
              variant="body1"
              sx={{
                display: "inline",
                color: value === index ? priorityColor[priority] : null,
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
