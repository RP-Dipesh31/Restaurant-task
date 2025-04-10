import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const categories = ["Appetizers", "Main Course", "Desserts", "Beverages"];

const defaultItem = {
  _id: "",
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
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(defaultItem);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleInputChange = (field: string, value: any) => {
    setSelectedItem((prev: any) => {
      const updated = { ...prev, [field]: value };
      setValue("menuItems", [updated]);
      return updated;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImagePreview(localUrl);
      handleInputChange("imageUrl", localUrl);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Sending item:", selectedItem);
      await axios.post("http://localhost:7000/api/menu-items", selectedItem);
      alert("Item saved.");
      setSelectedItem(defaultItem);
      setImagePreview(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Error saving item.");
    }
  };

  const handleUpdate = async () => {
    if (!selectedItem._id) return alert("No item selected.");
    try {
      await axios.put(`http://localhost:7000/api/menu-items/${selectedItem._id}`, selectedItem);
      alert("Item updated.");
      setSelectedItem(defaultItem);
      setImagePreview(null);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Error updating item.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:7000/api/menu-items/${id}`);
      alert("Item deleted.");
      if (selectedItem._id === id) {
        setSelectedItem(defaultItem);
        setImagePreview(null);
      }
      fetchItems();
    } catch (err) {
      console.error(err);
      alert("Error deleting item.");
    }
  };

  const handleEditClick = (item: any) => {
    setSelectedItem(item);
    setImagePreview(item.imageUrl);
  };

  const handleNewItem = () => {
    setSelectedItem(defaultItem);
    setImagePreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Menu Items</h2>
        <Button variant="outline" onClick={handleNewItem}>New Item</Button>
      </div>

      {/* Scrollable card layout */}
      <div className="flex overflow-x-auto gap-4 py-2">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="min-w-[200px] bg-white border rounded-lg p-3 shadow-sm flex-shrink-0"
          >
            <h4 className="font-semibold">{item.name}</h4>
            <p className="text-sm text-gray-600">{item.category}</p>
            <div className="mt-2 flex gap-2">
              <Button size="sm" onClick={() => handleEditClick(item)}>Edit</Button>
              <Button
                size="sm"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Form section */}
      <div className="border p-4 rounded space-y-3 bg-gray-50">
        <h3 className="font-semibold text-lg">Menu Item Details</h3>

        <Input
          value={selectedItem.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Name"
        />
        <Input
          type="number"
          value={selectedItem.price}
          onChange={(e) => handleInputChange("price", Number(e.target.value))}
          placeholder="Price"
        />
        <Input
          value={selectedItem.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Description"
        />

        <Input type="file" accept="image/*" onChange={handleFileChange} />
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
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex gap-4">
          <label>
            <input
              type="checkbox"
              checked={selectedItem.isVegetarian}
              onChange={(e) => handleInputChange("isVegetarian", e.target.checked)}
            /> Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedItem.isNonVegetarian}
              onChange={(e) => handleInputChange("isNonVegetarian", e.target.checked)}
            /> Non-Vegetarian
          </label>
          <label>
            <input
              type="checkbox"
              checked={selectedItem.isGlutenFree}
              onChange={(e) => handleInputChange("isGlutenFree", e.target.checked)}
            /> Gluten-Free
          </label>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleUpdate} disabled={!selectedItem._id}>Update</Button>
          <Button
            onClick={() => handleDelete(selectedItem._id)}
            disabled={!selectedItem._id}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
