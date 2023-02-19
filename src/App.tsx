import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CreateCardModal from "./features/cards/components/CreateCardModal";
import ConfirmationDialog from "./features/common/components/ConfirmationDialog";
import RoutesProvider from "./routes";
import { limestoneTheme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={limestoneTheme}>
      <BrowserRouter>
        <RoutesProvider></RoutesProvider>
      </BrowserRouter>

      {/* Here lies all global-level modals */}
      <CreateCardModal />
      <ConfirmationDialog />
      {/*-----------------------------------*/}
    </ThemeProvider>
  );
}

export default App;
