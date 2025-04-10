import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import AuthModal from "../auth/AuthModal";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold tracking-tight text-orange-500">
          MernEats.com
        </Link>
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={() => setIsAuthModalOpen(true)}
        >
          Log In
        </Button>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default Header;
