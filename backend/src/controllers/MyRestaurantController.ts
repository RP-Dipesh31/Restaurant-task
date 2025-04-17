import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";

export const createRestaurant = async (req: Request, res: Response): Promise<void> => {
  console.log("POST /api/restaurants hit 🚀");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  const {
    restaurantName,
    city,
    country,
    deliveryPrice,
    estimatedDeliveryTime,
    cuisines,
    menuItems,
  } = req.body;

  // Parse menuItems if it's a string
  let parsedMenuItems;
  if (typeof menuItems === 'string') {
    try {
      parsedMenuItems = JSON.parse(menuItems);
    } catch (error) {
      console.error("Failed to parse menuItems:", menuItems);
      res.status(400).json({ message: "Invalid JSON for menuItems" });
      return;
    }
  } else {
    parsedMenuItems = menuItems;
  }

  try {
    const imageUrl = req.file ? req.file.filename : "";
    console.log("Image URL:", imageUrl);

    const newRestaurant = new Restaurant({
      restaurantName,
      city,
      country,
      deliveryPrice: parseFloat(deliveryPrice),
      estimatedDeliveryTime: parseInt(estimatedDeliveryTime),
      cuisines: Array.isArray(cuisines) ? cuisines : [cuisines],
      menuItems: parsedMenuItems,
      imageUrl,
    });

    const savedRestaurant = await newRestaurant.save();
    console.log("Saved Restaurant:", savedRestaurant);
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error("Error saving restaurant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export const updateRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid restaurant ID" });
      return;
    }

    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;

    let parsedMenuItems = menuItems;
    if (typeof menuItems === "string") {
      try {
        parsedMenuItems = JSON.parse(menuItems);
      } catch {
        res.status(400).json({ message: "Invalid menuItems format" });
        return;
      }
    }

    const existing = await Restaurant.findById(id);
    if (!existing) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    const imageUrl = req.file ? req.file.filename : existing.imageUrl;

    const updated = await Restaurant.findByIdAndUpdate(
      id,
      {
        restaurantName,
        city,
        country,
        deliveryPrice: parseFloat(deliveryPrice),
        estimatedDeliveryTime: parseInt(estimatedDeliveryTime),
        cuisines: Array.isArray(cuisines) ? cuisines : [cuisines],
        menuItems: parsedMenuItems,
        imageUrl,
      },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating restaurant:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};


export const deleteRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid restaurant ID" });
      return;
    }

    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    // Optionally delete the image file
    if (restaurant.imageUrl) {
      const imagePath = path.join(__dirname, "../../uploads", restaurant.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (err) {
    console.error("Error deleting restaurant:", err);
    res.status(500).json({ message: "Internal server error", error: err });
  }
};


export default {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
