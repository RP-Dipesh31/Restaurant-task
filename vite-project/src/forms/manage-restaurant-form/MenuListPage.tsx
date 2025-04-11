import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import axios from "axios";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import { MenuItemType } from "@/types";
import { motion } from "framer-motion";

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
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {items.map((item) => (
            <motion.div
              key={item._id}
              className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[95%] xl:w-[90%] border p-4 rounded-2xl bg-white shadow-lg mx-auto transition-transform transform hover:-translate-y-2 hover:shadow-2xl"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-64 object-cover rounded-xl hover:scale-105 transition duration-300"
              />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 text-indigo-700 font-bold">
                ₹{item.price.toFixed(2)}
              </p>
              <div className="mt-3">
                {isInCart(item._id!) ? (
                  <button
                    onClick={() => {
                      removeFromCart(item._id!);
                      toast.success("Removed from cart");
                    }}
                    className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart(item);
                      toast.success("Added to cart");
                    }}
                    className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MenuListPage;
