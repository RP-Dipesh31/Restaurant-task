import React from "react";
import ReactDOM from "react-dom/client";
import App from "./src/AppRoutes";
import { BrowserRouter } from "react-router-dom";
//import { AuthProvider } from "./src/components/AuthContext"; // Ensure correct import path

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    
        <App />
   
    </BrowserRouter>
  </React.StrictMode>
);
