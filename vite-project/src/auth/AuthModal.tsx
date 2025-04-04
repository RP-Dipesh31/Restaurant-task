import React, { useState } from "react";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Modal from "../auth/Modal"; // Adjust the path if necessary

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        {isLogin ? (
          <Login onClose={onClose} toggleAuth={() => setIsLogin(false)} onLoginSuccess={() => {}} />
        ) : (
          <Signup onClose={onClose} toggleAuth={() => setIsLogin(true)} onSignupSuccess={() => {}} />
        )}
        <p className="text-center mt-3 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-orange-500 font-semibold underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;
