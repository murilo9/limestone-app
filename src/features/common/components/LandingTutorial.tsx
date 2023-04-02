import { Container, Typography } from "@mui/material";
import React from "react";
import addPeopleImg from "../assets/print-add-people.png";
import createBoardsImg from "../assets/print-create-boards.png";
import addCardsImg from "../assets/print-add-cards.png";
import manageImg from "../assets/print-manage.png";

export default function LandingTutorial() {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{ py: "96px" }}
      >
        <Typography
          variant="h4"
          color="black"
          textAlign="center"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Step 1. Add people
        </Typography>
        <Typography
          variant="subtitle1"
          color="black"
          textAlign="center"
          fontSize="22px"
          sx={{ mb: 8 }}
        >
          Make the presernce of people who you're going to work with.
        </Typography>
        <img
          className="lim-landing-tutorial-image"
          src={addPeopleImg}
          alt="Add People"
          style={{ width: "100%", marginBottom: "96px" }}
        />

        <Typography
          variant="h4"
          color="black"
          textAlign="center"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Step 2. Create boards
        </Typography>
        <Typography
          variant="subtitle1"
          color="black"
          textAlign="center"
          fontSize="22px"
          sx={{ mb: 8 }}
        >
          Boards may group your work by team divisions, sprints, product ideas
          or else. Their columns will represent work state.
        </Typography>
        <img
          className="lim-landing-tutorial-image"
          src={createBoardsImg}
          alt="Add People"
          style={{ width: "100%", marginBottom: "96px" }}
        />

        <Typography
          variant="h4"
          color="black"
          textAlign="center"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Step 3. Add cards
        </Typography>
        <Typography
          variant="subtitle1"
          color="black"
          textAlign="center"
          fontSize="22px"
          sx={{ mb: 8 }}
        >
          For tasks, activities, things to remember, or any piece of work.
        </Typography>
        <img
          className="lim-landing-tutorial-image"
          src={addCardsImg}
          alt="Add People"
          style={{ width: "100%", marginBottom: "96px" }}
        />

        <Typography
          variant="h4"
          color="black"
          textAlign="center"
          fontWeight={600}
          sx={{ mb: 2 }}
        >
          Step 4. Manage
        </Typography>
        <Typography
          variant="subtitle1"
          color="black"
          textAlign="center"
          fontSize="22px"
          sx={{ mb: 8 }}
        >
          Keep everything in order by moving card between columns and adding
          comments on them.
        </Typography>
        <img
          src={manageImg}
          alt="Add People"
          style={{ width: "100%" }}
        />
      </Container>
    </>
  );
}
