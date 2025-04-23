import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category: string;
  isVegetarian: boolean;
  isNonVegetarian: boolean;
  isGlutenFree: boolean;
  quantity: number;
  discountType?: 'BOGO' | 'PERCENTAGE'; // New field
  discountValue?: number; // New field for percentage
  createdAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  category: { type: String, required: true },
  isVegetarian: { type: Boolean, default: false },
  isNonVegetarian: { type: Boolean, default: false },
  isGlutenFree: { type: Boolean, default: false },
  quantity: { type: Number, default: 0 }, // New
  discountType: { type: String, enum: ['BOGO', 'PERCENTAGE'], default: null }, // New
  discountValue: { type: Number }, // New
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);

