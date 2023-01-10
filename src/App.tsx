import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesProvider from "./routes";
import { limestoneTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={limestoneTheme}>
      <BrowserRouter>
        <RoutesProvider></RoutesProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
