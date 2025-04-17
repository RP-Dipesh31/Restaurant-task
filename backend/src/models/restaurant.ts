import mongoose, { Document, Schema } from "mongoose";

interface Restaurant extends Document {
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: object[];
  imageUrl: string;
  lastUpdated: Date;
}

const restaurantSchema = new Schema<Restaurant>({
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: { type: [String], required: true },
  menuItems: { type: [Object], required: true },
  imageUrl: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Restaurant = mongoose.model<Restaurant>("Restaurant", restaurantSchema);

export default Restaurant;
