import {
  FilterAltOutlined,
  AddCircle,
  Search,
  Close,
} from "@mui/icons-material";
import {
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import React from "react";
import { useAppDispatch } from "../../../store";
import { SYSTEM_HEADER_PADDINGS } from "../../common/components/SystemHeader";
import { createBoardModalChanged } from "../boardsSlice";

export const BOARDS_HEADER_HEIGHTS = { xs: "120px", md: "56px" };

type BoardsHeaderProps = {
  query: string;
  setQuery: (value: string) => void;
};

export default function BoardsHeader({ query, setQuery }: BoardsHeaderProps) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const onCreatBoardButtonClick = () => {
    dispatch(createBoardModalChanged(true));
  };

  const onClearQuery = () => {
    setQuery("");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backdropFilter: "blur(14px)",
          py: { xs: 2, sm: 4 },
        }}
      >
        <Grid
          container
          maxWidth="xl"
          sx={{
            margin: "auto",
            px: SYSTEM_HEADER_PADDINGS,
          }}
        >
          <Grid
            item
            xs={6}
            md={3}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              color="#000000"
              fontWeight={300}
            >
              Boards
            </Typography>
          </Grid>

          <Grid
            item
            xs={6}
            md={3}
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color="primary"
              sx={{ pr: 0 }}
              onClick={onCreatBoardButtonClick}
            >
              <AddCircle sx={{ fontSize: "40px" }} />
            </IconButton>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: { xs: 3, md: 0 },
            }}
          >
            <TextField
              placeholder="Search"
              variant="standard"
              sx={{ width: { xs: "100%", md: "auto" } }}
              InputProps={{
                endAdornment: query ? (
                  <IconButton
                    onClick={onClearQuery}
                    size="small"
                  >
                    <Close />
                  </IconButton>
                ) : (
                  <Search
                    sx={{ color: theme.palette.text.disabled, p: "5px" }}
                  />
                ),
                sx: {
                  px: 2,
                },
              }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Button
              disableElevation
              variant="contained"
              color="secondary"
              sx={{ ml: 4, display: { xs: "none", md: "flex" } }}
              startIcon={<FilterAltOutlined />}
            >
              Filters
            </Button>
          </Grid>

          <Grid
            item
            xs={3}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              color="primary"
              sx={{ pr: 0 }}
              onClick={onCreatBoardButtonClick}
            >
              <AddCircle sx={{ fontSize: "40px" }} />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
