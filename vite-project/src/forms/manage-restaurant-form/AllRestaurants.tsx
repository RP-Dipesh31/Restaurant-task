import { useEffect, useState } from "react";
import axios from "axios";

const AllRestaurants = () => {
  interface Restaurant {
    _id: string;
    restaurantName: string;
    city: string;
    country: string;
    imageUrl: string;
  }

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/restaurants");
      console.log("Fetched restaurants:", response.data);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Restaurants</h1>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant._id} className="border p-4 mb-2">
            <h2 className="text-lg font-semibold">{restaurant.restaurantName}</h2>
            <p>{restaurant.city}, {restaurant.country}</p>
            <img src={restaurant.imageUrl} alt={restaurant.restaurantName} className="w-32 h-32 object-cover" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllRestaurants;
