import { Button } from "@mui/material";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import logo from "./logo.svg";
import RoutesProvider from "./routes";

function App() {
  return (
    <BrowserRouter>
      <RoutesProvider></RoutesProvider>
    </BrowserRouter>
  );
}

export default App;
