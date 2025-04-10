import { ReactNode } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MainNav from "@/components/MainNav";
import Header from "@/components/Header";
import { useAuth } from "@/components/AuthContext"; // adjust path if needed

type Props = {
  children: ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render MainNav or Header */}
      {isAuthenticated ? (
        <MainNav onLogout={logout} />
      ) : (
        <Header />
      )}

      {showHero && <Hero />}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
