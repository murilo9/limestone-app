import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import CreateBoardModal from "./features/boards/components/CreateBoardModal";
import CardDetailsModal from "./features/cards/components/CardDetailsModal";
import CreateCardModal from "./features/cards/components/CreateCardModal";
import ConfirmationDialog from "./features/common/components/ConfirmationDialog";
import RoutesProvider from "./routes";
import { limestoneTheme } from "./theme";

function App() {
  return (
    <GoogleOAuthProvider clientId="922525149840-e89mdsc3htvtt9eus19ag1hfhuneqek0.apps.googleusercontent.com">
      <ThemeProvider theme={limestoneTheme}>
        <BrowserRouter>
          <RoutesProvider></RoutesProvider>
        </BrowserRouter>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
