import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CreateCardModal from "./features/cards/components/CreateCardModal";
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

        {/* Here lies all global-level modals */}

        <CreateCardModal />

        {/*-----------------------------------*/}
      </ConfirmationDialogProvider>
    </ThemeProvider>
  );
}

export default App;
