import React, { useState, useEffect } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Modal from "../auth/Modal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isLogin?: boolean; // Optional prop
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, isLogin = true }) => {
  const [isLoginState, setIsLoginState] = useState(isLogin);

  useEffect(() => {
    setIsLoginState(isLogin);
  }, [isLogin]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {isLoginState ? (
          <Login onClose={onClose} toggleAuth={() => setIsLoginState(false)} onLoginSuccess={onLoginSuccess} />
        ) : (
          <Signup onClose={onClose} toggleAuth={() => setIsLoginState(true)} onSignupSuccess={onLoginSuccess} />
        )}
        
      </div>
    </Modal>
  );
};

export default AuthModal;
