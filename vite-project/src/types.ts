<<<<<<< HEAD
export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    addressLine1?: string;
    city?: string;
    country?: string;
};

export type MenuItemType = {
    _id: string;
    name:string;
    price:string;
}

export type Restaurant = {
    _id: string;
    // user: string;
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

=======
export type User ={
    _id: string;
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
>>>>>>> 6d3fbd6a518b8cbe988a913d33a389d1053a9c61
}