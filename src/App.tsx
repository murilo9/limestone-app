import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CardsProvider from "./features/cards/providers/CardsProvider";
import ConfirmationDialogProvider from "./features/common/providers/ConfirmationDialogProvider";
import RoutesProvider from "./routes";
import { limestoneTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={limestoneTheme}>
      <ConfirmationDialogProvider>
        <CardsProvider>
          <BrowserRouter>
            <RoutesProvider></RoutesProvider>
          </BrowserRouter>
        </CardsProvider>
      </ConfirmationDialogProvider>
    </ThemeProvider>
  );
}

export default App;
