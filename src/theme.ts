import { createTheme } from "@mui/material";

export const limestoneTheme = createTheme({
  palette: {
    primary: {
      light: "#7297A9",
      main: "#5A7E90",
      dark: "#425B68",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#B2CBCE",
      main: "#9FB5B8",
      dark: "#899C9E",
      contrastText: "#5A7E90",
    },
    error: {
      main: "#B72727",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#5A7E90",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: "none",
          fontFamily: "Poppins",
        },
        sizeMedium: {
          height: "40px",
        },
      },
    },
  },
});
