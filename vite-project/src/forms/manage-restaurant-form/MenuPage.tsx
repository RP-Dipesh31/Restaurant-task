import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItemType } from "@/types";
import { calculateFinalPrice } from "@/utils/calculateDiscount";
import { Button } from "@/components/ui/button";

const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"] as const;

const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    vegetarian: false,
    glutenFree: false,
    nonVegetarian: false,
  });
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    axios
      .get<MenuItemType[]>("/api/menu-items")
      .then((res) => {
        setMenuItems(res.data);
        // init qty = 1
        const init = res.data.reduce((acc, i) => {
          if (i._id) {
            acc[i._id] = 1;
          }
          return acc;
        }, {} as Record<string, number>);
        setQuantities(init);
      })
      .catch(() => alert("Failed to load menu items."));
  }, []);

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (filters.vegetarian && !item.isVegetarian) return false;
    if (filters.glutenFree && !item.isGlutenFree) return false;
    if (filters.nonVegetarian && !item.isNonVegetarian) return false;
    return true;
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters((f) => ({ ...f, [key]: !f[key] }));
  };

  const handleQty = (id: string, qty: number) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(1, qty) }));
  };

  const addToCart = (item: MenuItemType, qty: number) => {
    // your existing cart logic here…
    console.log("Add to cart:", item, "qty:", qty);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Our Menu</h1>

      {/* Category Tabs */}
      <div className="flex gap-4">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
        <Button onClick={() => setSelectedCategory(null)} variant="ghost">
          All
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mt-4">
        {["vegetarian", "glutenFree", "nonVegetarian"].map((key) => (
          <label key={key} className="inline-flex items-center space-x-1">
            <input
              type="checkbox"
              checked={(filters as any)[key]}
              onChange={() => toggleFilter(key as any)}
            />
            <span className="text-sm capitalize">{key}</span>
          </label>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const qty = item._id ? quantities[item._id] || 1 : 1;
          const original = (item.price * qty).toFixed(2);
          const discounted = calculateFinalPrice(item, qty).toFixed(2);

          return (
            <div
              key={item._id}
              className="relative border p-4 rounded shadow bg-white flex flex-col justify-between"
            >
              {item.discountType && (
                <span className="absolute top-2 left-2 badge badge-secondary text-xs font-bold px-2 py-1 rounded-full">
                  {item.discountType === "PERCENTAGE"
                    ? `${item.discountValue}% OFF`
                    : "BOGO"}
                </span>
              )}

              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.description}</p>

              {/* Quantity Input */}
              <div className="mt-2 flex items-center space-x-2">
                <label htmlFor={`qty-${item._id}`} className="text-sm">Qty:</label>
                <input
                  id={`qty-${item._id}`}
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => item._id && handleQty(item._id, +e.target.value)}
                  className="w-16 border rounded px-2 py-1 text-sm"
                />
              </div>

              <div className="mt-1 flex items-baseline gap-2">
                {item.discountType ? (
                  <>
                    <span className="line-through text-gray-500">
                      ₹{original}
                    </span>
                    <span className="font-bold">
                      ₹{discounted}
                    </span>
                  </>
                ) : (
                  <span className="font-bold">
                    ₹{original}
                  </span>
                )}
              </div>

              <Button className="mt-2" onClick={() => addToCart(item, qty)}>
                Add {qty}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MenuPage;
