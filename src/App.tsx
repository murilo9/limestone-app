import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import ConfirmationDialogProvider from "./features/common/providers/ConfirmationDialogProvider";
import RoutesProvider from "./routes";
import { limestoneTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={limestoneTheme}>
      <ConfirmationDialogProvider>
        <BrowserRouter>
          <RoutesProvider></RoutesProvider>
        </BrowserRouter>
      </ConfirmationDialogProvider>
    </ThemeProvider>
  );
}

export default App;
