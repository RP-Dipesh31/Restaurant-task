import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './global.css';
import {BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ Correct

=======
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import { QueryClient, QueryClientProvider } from "react-query";
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
import { Toaster } from "sonner";


const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Router>
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
        <AppRoutes/>
        <Toaster visibleToasts={1} position="top-right" richColors/>
=======
      <Auth0ProviderWithNavigate>
        <AppRoutes/>
        <Toaster visibleToasts={1} position="top-right" richColors/>
      </Auth0ProviderWithNavigate>
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
    </QueryClientProvider>
   </Router>
  </StrictMode>
);
