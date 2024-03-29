import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../../../store";
import PeopleHeader from "../components/PeopleHeader";
import UserCard from "../components/UserCard";
import { UserEntity } from "../types/User";

const filterPeopleByQuery = (query: string, user: UserEntity) =>
  user.firstName.toLowerCase().includes(query.toLowerCase()) ||
  user.lastName.toLowerCase().includes(query.toLowerCase());

export default function PeoplePage() {
  const people = useAppSelector((state) => state.users.entities);
  const [query, setQuery] = useState("");

  return (
    <>
      <Box
        className="lim-people-page"
        sx={{
          px: "0 !important",
          margin: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PeopleHeader
          query={query}
          setQuery={setQuery}
        />
        <Box
          className="lim-people-list"
          sx={{
            width: "100%",
            flex: "1 1",
            overflowY: "auto",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            maxWidth="xl"
            spacing={2}
            sx={{ px: { xs: 3, xl: 0 }, py: 4 }}
          >
            {Object.entries(people)
              .filter(([userId, user]) =>
                query.trim() ? filterPeopleByQuery(query.trim(), user) : true
              )
              .map(([userId, user]) => (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={userId}
                  >
                    <UserCard user={user} />
                  </Grid>
                </>
              ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
