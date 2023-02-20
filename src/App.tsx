import { ThemeProvider } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CardDetailsModal from "./features/cards/components/CardDetailsModal";
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
      <CardDetailsModal />
      {/*-----------------------------------*/}
    </ThemeProvider>
  );
}

export default App;
