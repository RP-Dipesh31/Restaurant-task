import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addressLine1: { type: String, required: false },
  city: { type: String, required: false },
  country: { type: String, required: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Added role field 
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
