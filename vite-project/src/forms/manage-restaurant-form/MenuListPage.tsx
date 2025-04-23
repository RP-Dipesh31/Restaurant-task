import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "@/components/Footer";
import MainNav from "@/components/MainNav";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";
import { MenuItemType } from "@/types";
import { calculateFinalPrice } from "@/utils/calculateDiscount";
import { motion } from "framer-motion";

const MenuListPage: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    axios
      .get<MenuItemType[]>("http://localhost:7000/api/menu-items")
      .then((res) => {
        setMenuItems(res.data);
        // Initialize quantity = 1 for each item
        const initial = res.data.reduce((acc, item) => {
          if (item._id) {
            acc[item._id] = 1;
          }
          return acc;
        }, {} as Record<string, number>);
        setQuantities(initial);
      })
      .catch(() => alert("Failed to load menu items."));
  }, []);

  const getFilteredItems = () => {
    switch (category?.toLowerCase()) {
      case "vegetarian":
        return menuItems.filter((i) => i.isVegetarian);
      case "nonvegetarian":
        return menuItems.filter((i) => i.isNonVegetarian);
      case "glutenfree":
        return menuItems.filter((i) => i.isGlutenFree);
      default:
        return menuItems;
    }
  };
  const filtered = getFilteredItems();

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(1, qty) }));
  };

  return (
    <>
      <MainNav onLogout={() => console.log("User logged out")} />
      <div className="p-4 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Menu"}{" "}
          Items
        </h1>
        <Section
          items={filtered}
          quantities={quantities}
          onQtyChange={handleQtyChange}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          isInCart={isInCart}
        />
      </div>
      <Footer />
    </>
  );
};

interface SectionProps {
  items: MenuItemType[];
  quantities: Record<string, number>;
  onQtyChange: (id: string, qty: number) => void;
  addToCart: (item: MenuItemType, qty: number) => void;
  removeFromCart: (id: string) => void;
  isInCart: (id: string) => boolean;
}

const Section: React.FC<SectionProps> = ({
  items,
  quantities,
  onQtyChange,
  addToCart,
  removeFromCart,
  isInCart,
}) => {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-1">
        Menu
      </h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No items available.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {items.map((item) => {
            const qty = item._id ? quantities[item._id] || 1 : 1;
            const originalTotal = (item.price * qty).toFixed(2);
            const discountedTotal = calculateFinalPrice(item, qty).toFixed(2);

            return (
              <motion.div
                key={item._id}
                className="relative border p-4 rounded-2xl bg-white shadow-lg mx-auto transform hover:-translate-y-2 hover:shadow-2xl transition"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Discount Badge */}
                {item.discountType && (
                  <span
                    role="status"
                    aria-label={
                      item.discountType === "PERCENTAGE"
                        ? `${item.discountValue}% off`
                        : "Buy one get one free"
                    }
                    className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                  >
                    {item.discountType === "PERCENTAGE"
                      ? `${item.discountValue}% OFF`
                      : "BOGO"}
                  </span>
                )}

                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-64 object-cover rounded-xl transition-transform hover:scale-105 duration-300"
                />

                <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>

                {/* Quantity Selector */}
                <div className="mt-2 flex items-center space-x-2">
                  <label htmlFor={`qty-${item._id}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    id={`qty-${item._id}`}
                    type="number"
                    min={1}
                    value={qty}
                    onChange={(e) => item._id && onQtyChange(item._id, +e.target.value)}
                    className="w-16 border rounded px-2 py-1 text-sm"
                  />
                </div>

                {/* Price Display */}
                <div className="mt-2 flex items-baseline gap-2">
                  {item.discountType ? (
                    <>
                      <span className="line-through text-gray-500">
                        ₹{originalTotal}
                      </span>
                      <span className="text-indigo-700 font-bold">
                        ₹{discountedTotal}
                      </span>
                    </>
                  ) : (
                    <span className="text-indigo-700 font-bold">
                      ₹{originalTotal}
                    </span>
                  )}
                </div>

                {/* Cart Actions */}
                <div className="mt-3">
                  {isInCart(item._id ?? "") ? (
                    <button
                      onClick={() => {
                        removeFromCart(item._id ?? "");
                        toast.success("Removed from cart");
                      }}
                      className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        addToCart(item, qty);
                        toast.success("Added to cart");
                      }}
                      className="bg-green-600 hover:bg-green-700 transition text-white px-3 py-1 rounded"
                    >
                      Add {qty}
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default MenuListPage;

