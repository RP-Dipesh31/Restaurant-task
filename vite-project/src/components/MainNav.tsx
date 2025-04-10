import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import CartModal from "./CartModal";

interface MainNavProps {
  onLogout: () => void;
}

const MainNav = ({ onLogout }: MainNavProps) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoMenuOpen, setInfoMenuOpen] = useState(false);
  const [reservationMenuOpen, setReservationMenuOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const { cartItemCount } = useCart();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  const openCartModal = () => setCartModalOpen(true);
  const closeCartModal = () => setCartModalOpen(false);

  return (
    <>
      <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-tight text-orange-500">
            MernEats.com
          </Link>

          {/* Navigation links */}
          <div className="flex space-x-6 items-center relative">
            {/* Dashboard Dropdown */}
            <div className="relative">
              <button
                className="font-bold hover:text-orange-500"
                onClick={() => {
                  setMenuOpen(false);
                  setInfoMenuOpen(false);
                  setReservationMenuOpen(false);
                  setDashboardMenuOpen((prev) => !prev);
                }}
              >
                Dashboard
              </button>
              {dashboardMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <Link
                    to="/manage-restaurant"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setDashboardMenuOpen(false)}
                  >
                    Manage Restaurant
                  </Link>
                  <Link
                    to="/restaurants"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setDashboardMenuOpen(false)}
                  >
                    All Restaurants
                  </Link>
                </div>
              )}
            </div>

            {/* Reservation Dropdown */}
            <div className="relative">
              <button
                className="font-bold hover:text-orange-500"
                onClick={() => {
                  setMenuOpen(false);
                  setInfoMenuOpen(false);
                  setDashboardMenuOpen(false);
                  setReservationMenuOpen((prev) => !prev);
                }}
              >
                Reservation
              </button>
              {reservationMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <Link
                    to="/reservation"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setReservationMenuOpen(false)}
                  >
                    Reserve Table
                  </Link>
                  <Link
                    to="/reservation-list"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setReservationMenuOpen(false)}
                  >
                    Reservation List
                  </Link>
                </div>
              )}
            </div>

            {/* Our Menu Dropdown */}
            <div className="relative">
              <button
                className="font-bold hover:text-orange-500"
                onClick={() => {
                  setInfoMenuOpen(false);
                  setReservationMenuOpen(false);
                  setDashboardMenuOpen(false);
                  setMenuOpen((prev) => !prev);
                }}
              >
                Our Menu
              </button>
              {menuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <Link
                    to="/menu/vegetarian"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Vegetarian
                  </Link>
                  <Link
                    to="/menu/nonvegetarian"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Non-Vegetarian
                  </Link>
                  <Link
                    to="/menu/glutenfree"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Gluten-Free
                  </Link>
                </div>
              )}
            </div>

            {/* Info Dropdown */}
            <div className="relative">
              <button
                className="font-bold hover:text-orange-500"
                onClick={() => {
                  setMenuOpen(false);
                  setReservationMenuOpen(false);
                  setDashboardMenuOpen(false);
                  setInfoMenuOpen((prev) => !prev);
                }}
              >
                Info
              </button>
              {infoMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                  <Link
                    to="/about-us"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setInfoMenuOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 hover:bg-orange-100"
                    onClick={() => setInfoMenuOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>

            {/* 🛒 Cart Icon with count */}
            <button onClick={openCartModal} className="relative">
              <FaShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-500" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>


            <Button className="px-3 font-bold hover:bg-gray-500" onClick={handleLogoutClick}>
              Log Out
            </Button>
          </div>
        </div>
      </div>
      <CartModal isOpen={isCartModalOpen} onClose={closeCartModal} />
    </>
  );
};

export default MainNav;
