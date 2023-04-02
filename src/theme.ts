import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#7297A9",
      main: "#5A7E90",
      dark: "#425B68",
      contrastText: "#FFFFFF",
    },
    secondary: {
      light: "#F5F8F7",
      main: "#F5F8F7",
      dark: "#EFEFEF",
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
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#5A7E90",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "#5A7E90",
        },
      },
    },
  },
});

export const limestoneTheme = responsiveFontSizes(theme);
