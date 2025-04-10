import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import { MenuItemType } from "@/types";

const MenuListPage = () => {
  const { category } = useParams();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:7000/api/menu-items")
      .then((res) => setMenuItems(res.data))
      .catch(() => alert("Failed to load menu items."));
  }, []);

  const getFilteredItems = () => {
    switch (category?.toLowerCase()) {
      case "vegetarian":
        return menuItems.filter((item) => item.isVegetarian);
      case "nonvegetarian":
        return menuItems.filter((item) => item.isNonVegetarian);
      case "glutenfree":
        return menuItems.filter((item) => item.isGlutenFree);
      default:
        return menuItems;
    }
  };

  const filteredItems = getFilteredItems();

  return (
    <>
      <MainNav onLogout={() => console.log("User logged out")} />
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {category ? category.charAt(0).toUpperCase() + category.slice(1) : "Menu"} Items
        </h1>
        <Section title="Menu" items={filteredItems} />
      </div>
      <Footer />
    </>
  );
};

interface SectionProps {
  title: string;
  items: MenuItemType[];
}

const Section = ({ title, items }: SectionProps) => {
  const { addToCart, removeFromCart, isInCart } = useCart();

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-1">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No items available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border border-gray-100"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <p className="text-base font-bold text-green-600">
                ${item.price.toFixed(2)}
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
                {item.isVegetarian && (
                  <span className="bg-green-500 px-2 py-0.5 rounded-full">
                    Vegetarian
                  </span>
                )}
                {item.isNonVegetarian && (
                  <span className="bg-red-500 px-2 py-0.5 rounded-full">
                    Non-Vegetarian
                  </span>
                )}
                {item.isGlutenFree && (
                  <span className="bg-yellow-500 px-2 py-0.5 rounded-full">
                    Gluten-Free
                  </span>
                )}
              </div>

              {isInCart(item._id!) ? (
                <button
                  onClick={() => {
                    removeFromCart(item._id!);
                    toast.error(`${item.name} removed from cart.`);
                  }}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    addToCart(item);
                    toast.success(`${item.name} added to cart!`);
                  }}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuListPage;
