
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"];

function generateObjectId() {
  const timestamp = Math.floor(Date.now() / 1000).toString(16);
  const random = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return (timestamp + random).slice(0, 24);
}

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  isVegetarian: boolean;
  isNonVegetarian: boolean;
  isGlutenFree: boolean;
}

const defaultItem: MenuItem = {
  _id: generateObjectId(),
  name: "",
  price: 0,
  description: "",
  imageUrl: "",
  category: "Appetizers",
  isVegetarian: false,
  isNonVegetarian: false,
  isGlutenFree: false,
};

const MenuSection = () => {
  const { setValue } = useFormContext();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem>(defaultItem);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/menu-items");
      setMenuItems(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching menu items.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    setValue("menuItems", [selectedItem]);
  }, [selectedItem, setValue]);

  const handleInputChange = (field: keyof MenuItem, value: any) => {
    setSelectedItem((prev) => {
      const updated = { ...prev, [field]: value };
      setValue("menuItems", [updated]);
      return updated;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("http://localhost:7000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      
      const imageUrl = res.data.imageUrl;
      setImagePreview(imageUrl);
      handleInputChange("imageUrl", imageUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to upload image");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("http://localhost:7000/api/menu-items", selectedItem);
      alert("Item saved.");
      handleNewItem();
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Error saving item.");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:7000/api/menu-items/${selectedItem._id}`, selectedItem);
      alert("Item updated.");
      handleNewItem();
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Error updating item.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`http://localhost:7000/api/menu-items/${id}`);
      alert("Item deleted.");
      if (selectedItem._id === id) handleNewItem();
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    }
  };

  const handleEditClick = (item: MenuItem) => {
    setSelectedItem(item);
    setImagePreview(item.imageUrl);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleNewItem = () => {
    const newItem = { ...defaultItem, _id: generateObjectId() };
    setSelectedItem(newItem);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Menu Items</h2>
        <Button variant="outline" onClick={handleNewItem}>New Item</Button>
      </div>

      <div className="flex overflow-x-auto gap-4 py-2">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="min-w-[200px] bg-white border rounded-lg p-3 shadow-sm flex-shrink-0"
          >
            {/* Image preview */}
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <h4 className="font-semibold">{item.name}</h4> 
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" onClick={() => handleEditClick(item)}>Edit</Button>
              <Button size="sm" onClick={() => handleDelete(item._id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>


      <div className="border p-4 rounded space-y-3 bg-gray-50">
        <h3 className="font-semibold text-lg">Menu Item Details</h3>

        <Input
          value={selectedItem.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Item Name"
        />

        <Input
          type="number"
          value={Number.isFinite(selectedItem.price) ? selectedItem.price : ""}
          onChange={(e) => {
            const val = e.target.value;
            handleInputChange("price", val === "" ? 0 : parseFloat(val));
          }}
          placeholder="Price"
        />

        <Input
          value={selectedItem.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Description"
        />

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="w-24 h-24 rounded object-cover"
          />
        )}

        <select
          className="w-full border p-2 rounded"
          value={selectedItem.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-4 items-center">
          <label>
            <input
              type="checkbox"
              checked={selectedItem.isVegetarian}
              onChange={(e) => handleInputChange("isVegetarian", e.target.checked)}
            />{" "}
            Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedItem.isNonVegetarian}
              onChange={(e) => handleInputChange("isNonVegetarian", e.target.checked)}
            />{" "}
            Non-Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedItem.isGlutenFree}
              onChange={(e) => handleInputChange("isGlutenFree", e.target.checked)}
            />{" "}
            Gluten-Free
          </label>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave}>Save New</Button>
          <Button onClick={handleUpdate} disabled={!selectedItem._id}>Update</Button>
          <Button onClick={() => handleDelete(selectedItem._id)} disabled={!selectedItem._id}>Remove</Button>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
