import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Card } from "../types/Card";
import { CardComment } from "../types/CardComment";

type CardCardProps = {
  card: Card;
};

export default function CardCard({ card }: CardCardProps) {
  return (
    <>
      <Box
        sx={{
          bgcolor: "rgba(178, 203, 206, 0.5)",
          p: 1,
          borderRadius: "6px",
          "&:not(:last-child)": {
            mb: 1,
          },
        }}
      >
        <Typography variant="body2">{card.title}</Typography>
        <Grid
          container
          sx={{ mt: 1 }}
        >
          <Grid
            item
            xs={6}
          >
            {card.assignee ? (
              <Avatar sx={{ height: "24px", width: "24px", fontSize: "12px" }}>
                AS
              </Avatar>
            ) : null}
          </Grid>
          <Grid
            item
            xs={6}
          ></Grid>
        </Grid>
      </Box>
    </>
  );
}
