// import { useState } from "react";
// import { Button } from "./ui/button";
// import AuthModal from "../auth/AuthModal";

// const MainNav = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true); // Track which form to show

//   return (
//     <>
//       <span className="flex space-x-2 items-center">
//         {/* Login Button */}
//         <Button
//           variant="ghost"
//           className="font-bold hover:text-orange-500 hover:bg-white"
//           onClick={() => {
//             setIsLogin(true);
//             setModalOpen(true);
//           }}
//         >
//           Log In
//         </Button>
       
//       </span>

//       {/* Unified Auth Modal */}
//       <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} isLogin={isLogin} />
//     </>
//   );
// };

// export default MainNav;


import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import AuthModal from "../auth/AuthModal";

const MainNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("authToken") !== null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Listen for login updates
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("authToken") !== null);
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("authToken", "sample_token"); // Store token
    setIsLoggedIn(true);
    setIsAuthModalOpen(false); // Close modal on login success
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    window.location.reload(); // Refresh UI
  };

  return (
    <div className="flex space-x-4 items-center">
      {!isLoggedIn ? (
        <Button
          variant="ghost"
          className="font-bold hover:text-orange-500 hover:bg-white"
          onClick={() => setIsAuthModalOpen(true)}
        >
          Log In
        </Button>
      ) : (
        <>
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Restaurant
          </Link>
          <Link to="/restaurants" className="font-bold hover:text-orange-500">
            All Restaurants
          </Link>
          <Link to="/reservation" className="font-bold hover:text-orange-500">
            Reserve a Table
          </Link>
          <Link to="/about-us" className="font-bold hover:text-orange-500">
            About Us
          </Link>
          <Link to="/contact" className="font-bold hover:text-orange-500">
            Contact
          </Link>
          <Button className="px-3 font-bold hover:bg-gray-500" onClick={handleLogout}>
            Log Out
          </Button>
        </>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        isLogin={!isLoggedIn} // Pass isLogin based on login state
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default MainNav;





