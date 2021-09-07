import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FoodProvider } from "./hooks/useFood";
import { Routes } from "./routes";

import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <FoodProvider>
      <Router>
        <Routes />
        <GlobalStyle />
      </Router>
    </FoodProvider>
  );
};

export default App;
