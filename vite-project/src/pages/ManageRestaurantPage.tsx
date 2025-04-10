
import { useState } from "react";
import createRestaurant from "../api/MyRestaurantApi";
import { Restaurant } from "@/types";
import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";
import { useNavigate } from "react-router-dom";

const ManageRestaurantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

const handleSaveRestaurant = async (restaurantData: Omit<Restaurant, "_id">) => {
  try {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("restaurantName", restaurantData.restaurantName);
    formData.append("city", restaurantData.city);
    formData.append("country", restaurantData.country);
    formData.append("deliveryPrice", restaurantData.deliveryPrice.toString());
    formData.append("estimatedDeliveryTime", restaurantData.estimatedDeliveryTime.toString());

    restaurantData.cuisines.forEach(cuisine => formData.append("cuisines[]", cuisine));
    restaurantData.menuItems.forEach((item, index) => {
        formData.append(`menuItems[${index}][name]`, item.name);
        formData.append(`menuItems[${index}][price]`, item.price.toString());
    });

    if (restaurantData.imageFile) {
        formData.append("imageFile", restaurantData.imageFile);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    await createRestaurant(formData);
    navigate("/restaurants"); // Redirect to the Restaurants Page after successful creation
  } catch (error) {
    console.error("Error saving restaurant:", error);
  } finally {
    setIsLoading(false);
  }
};

return <ManageRestaurantForm onSave={handleSaveRestaurant} isLoading={isLoading} />;
};

export default ManageRestaurantPage;
