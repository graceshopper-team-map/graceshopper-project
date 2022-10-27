import React from "react";
import { Navbar } from "../features";

import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;
