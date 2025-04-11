
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

const createMyRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingRestaurant = await Restaurant.findOne({ restaurantName: req.body.restaurantName });
    if (existingRestaurant) {
      res.status(409).json({ message: "Restaurant already exists" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }

    const image = req.file as Express.Multer.File;
    // Construct the image URL using the file name
    const imageUrl = `/uploads/${image.filename}`;

    // Parse menuItems from request (assuming it's sent as a JSON string)
    const menuItems = JSON.parse(req.body.menuItems);

    const newRestaurant = new Restaurant({
      restaurantName: req.body.restaurantName,
      city: req.body.city,
      country: req.body.country,
      deliveryPrice: parseFloat(req.body.deliveryPrice),
      estimatedDeliveryTime: parseInt(req.body.estimatedDeliveryTime),
      cuisines: req.body.cuisines, // Adjust if it needs JSON parsing
      menuItems,
      imageUrl, // Final image URL
      lastUpdated: new Date(),
    });

    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant created successfully", restaurant: newRestaurant });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid restaurant ID" });
      return;
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    let imageUrl = restaurant.imageUrl;

    if (req.file) {
      const image = req.file as Express.Multer.File;
      const newFileName = `${Date.now()}_${image.originalname}`;
      const newUploadPath = path.join(__dirname, "../../uploads", newFileName);
      fs.writeFileSync(newUploadPath, image.buffer);
      imageUrl = `/uploads/${newFileName}`;

      // Optionally delete old image file
      if (restaurant.imageUrl && restaurant.imageUrl.startsWith("/uploads/")) {
        const oldImagePath = path.join(__dirname, "../../", restaurant.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { ...req.body, imageUrl, lastUpdated: new Date() },
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid restaurant ID" });
      return;
    }

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    // Delete image from local file system
    if (restaurant.imageUrl && restaurant.imageUrl.startsWith("/uploads/")) {
      const imagePath = path.join(__dirname, "../../", restaurant.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default {
  createMyRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
};

