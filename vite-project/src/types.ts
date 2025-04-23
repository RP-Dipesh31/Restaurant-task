export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    addressLine1?: string;
    city?: string;
    country?: string;
    role: string; // role: "admin" or "user"
};


export type MenuItemType = {
    _id?: string;
    name: string;
    description: string;
    price: number; // or string, but consistent
    category: string;
    imageUrl?: string;
    isVegetarian: boolean;
    isGlutenFree: boolean;
    isNonVegetarian?: boolean;
    discountType?: "PERCENTAGE" | "BOGO"; // Added property
    discountValue?: number; // Optional discount value
  
};
  
export type Restaurant = {
    _id: string;
    restaurantName: string;
    city: string;
    country: string; // Add this line
    deliveryPrice:number;
    estimatedDeliveryTime: number;
    cuisines: string[];
    menuItems: MenuItemType[];
    imageUrl: string;
    lastUpdated: string;
    imageFile: File;
}