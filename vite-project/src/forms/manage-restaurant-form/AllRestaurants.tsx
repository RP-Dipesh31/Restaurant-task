import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string; // Optional image URL for the menu item
}

interface Restaurant {
  _id: string;
  restaurantName: string;
  city: string;
  country: string;
  imageUrl: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItem[];
}

const AllRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Use useNavigate for programmatic navigation

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get<Restaurant[]>('http://localhost:7000/api/restaurants');
        setRestaurants(response.data);
      } catch (err) {
        setError('Failed to fetch restaurants. Please try again later.');
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleCardClick = (id: string) => {
    navigate(`/restaurant-menu/${id}`); // Navigate to the restaurant menu page with the restaurant id
  };

  if (loading) {
    return <div className="text-center mt-8">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Restaurants</h1>
      {restaurants.length === 0 ? (
        <p className="text-gray-600">No restaurants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCardClick(restaurant._id)} // Trigger the handleCardClick function
            >
              <img
                src={`http://localhost:7000/uploadImages/${restaurant.imageUrl}`}
                alt={restaurant.restaurantName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{restaurant.restaurantName}</h2>
                <p className="text-gray-600">
                  {restaurant.city}, {restaurant.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRestaurants;
