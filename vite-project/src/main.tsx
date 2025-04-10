import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './global.css';
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "./components/AuthContext";
import { CartProvider } from "../src/context/CartContext"; // ✅ Your CartContext import

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider> {/* ✅ Wrap AppRoutes with CartProvider */}
            <AppRoutes />
            <Toaster visibleToasts={1} position="top-right" richColors />
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  </StrictMode>
);
