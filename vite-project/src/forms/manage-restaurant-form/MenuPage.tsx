import { useState, useEffect } from "react";
import { MenuItemType } from "@/types";
import { Button } from "@/components/ui/button";

const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"] as const;

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({ vegetarian: false, glutenFree: false, nonVegetarian: false });
  const [cart, setCart] = useState<MenuItemType[]>([]);

  useEffect(() => {
    // Fetch menu items from API
    const fetchMenuItems = async () => {
      const response = await fetch("/api/menu"); // Update with actual endpoint
      const data = await response.json();
      setMenuItems(data);
    };

    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (filters.vegetarian && !item.isVegetarian) return false;
    if (filters.glutenFree && !item.isGlutenFree) return false;
    if (filters.nonVegetarian && item.isVegetarian) return false;
    return true;
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters({ ...filters, [key]: !filters[key] });
  };

  const addToCart = (item: MenuItemType) => {
    setCart((prev) => [...prev, item]);
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
        <label>
          <input
            type="checkbox"
            checked={filters.vegetarian}
            onChange={() => toggleFilter("vegetarian")}
          />
          Vegetarian
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.glutenFree}
            onChange={() => toggleFilter("glutenFree")}
          />
          Gluten-Free
        </label>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="border p-4 rounded shadow bg-white flex flex-col justify-between"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="font-bold mt-1">${(parseInt(item.price.toString()) / 100).toFixed(2)}</p>
            <Button className="mt-2" onClick={() => addToCart(item)}>
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
