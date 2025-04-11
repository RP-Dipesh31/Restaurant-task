
// import { useState } from "react";
// import createRestaurant from "../api/MyRestaurantApi";
// import { Restaurant } from "@/types";
// import ManageRestaurantForm from "../forms/manage-restaurant-form/ManageRestaurantForm";
// import { useNavigate } from "react-router-dom";

// const ManageRestaurantPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSaveRestaurant = async (restaurantData: Omit<Restaurant, "_id">) => {
//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("restaurantName", restaurantData.restaurantName);
//       formData.append("city", restaurantData.city);
//       formData.append("country", restaurantData.country);
//       formData.append("deliveryPrice", restaurantData.deliveryPrice.toString());
//       formData.append("estimatedDeliveryTime", restaurantData.estimatedDeliveryTime.toString());
      
//       // Append cuisines properly
//       restaurantData.cuisines.forEach(cuisine => formData.append("cuisines", cuisine));
  
//       // Convert menuItems to JSON
//       formData.append("menuItems", JSON.stringify(restaurantData.menuItems));
  
//       if (restaurantData.imageFile) {
//         formData.append("imageFile", restaurantData.imageFile);
//       }
  
//       await createRestaurant(formData); // Send form data to API
//       navigate("/restaurants"); // Navigate after save
//     } catch (error) {
//       console.error("Error saving restaurant:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
  

// return <ManageRestaurantForm onSave={handleSaveRestaurant} isLoading={isLoading} />;
// };

// export default ManageRestaurantPage;

import { useState } from "react";
import createRestaurant from "../api/MyRestaurantApi";
import { Restaurant } from "@/types";
import ManageRestaurantForm, { RestaurantFormData } from "../forms/manage-restaurant-form/ManageRestaurantForm";
import { useNavigate } from "react-router-dom";

const ManageRestaurantPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveRestaurant = async (
    restaurantData: Omit<RestaurantFormData, "imageFile"> & { imageFile: File }
  ) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("restaurantName", restaurantData.restaurantName);
      formData.append("city", restaurantData.city);
      formData.append("country", restaurantData.country);
      formData.append("deliveryPrice", restaurantData.deliveryPrice.toString());
      formData.append("estimatedDeliveryTime", restaurantData.estimatedDeliveryTime.toString());
      
      // Append cuisines: each cuisine as separate field (or you can JSON.stringify if expected by backend)
      restaurantData.cuisines.forEach((cuisine) => formData.append("cuisines", cuisine));
  
      // Append menuItems as a JSON string so the backend can parse it
      formData.append("menuItems", JSON.stringify(restaurantData.menuItems));
  
      // Append imageFile with the expected field name "imageFile"
      formData.append("imageFile", restaurantData.imageFile);
  
      // Debug: log FormData entries
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      await createRestaurant(formData);
      alert("Restaurant created successfully!");
      navigate("/restaurants");
    } catch (error) {
      console.error("Error saving restaurant:", error);
      alert("Error saving restaurant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return <ManageRestaurantForm onSave={handleSaveRestaurant} isLoading={isLoading} />;
};

export default ManageRestaurantPage;

