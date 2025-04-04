// import { error } from "console";
// import { Request, Response} from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";

// const createMyRestaurant = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const existingRestaurant = await Restaurant.find({user: req.userId});

//         if(existingRestaurant){
//            // return res.status(409).json({message: "User restaurant already exists"});
//            res.status(409).json({ message: "User restaurant already exists" });
//            return;
//         }

//         if (!req.file) {
//             res.status(400).json({ message: "Image file is required" });
//             return;
//         }

//         const image = req.file as Express.Multer.File;
//         const base64Image = Buffer.from(image.buffer).toString("base64");
//         const dataURI = `data:$(image.mimetype);base64,${base64Image}`;

//         const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

//         const restaurant = new Restaurant(req.body);
//         restaurant.imageUrl = uploadResponse.url;
//         restaurant.user = new mongoose.Types.ObjectId(req.userId);
//         restaurant.lastUpdated = new Date();
//         await restaurant.save();

//         res.status(201).send(restaurant);
//     }catch(error){
//         console.log(error);
//         res.status(500).json({message: "Something went wrong"});
//     }
// };

// export default{
//     createMyRestaurant,
// }

// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";

// const createMyRestaurant = async (req: Request, res: Response): Promise<void> => {
//     try {
//         // Optional: Check if a restaurant with the same name already exists.
//         // Adjust this logic if needed.
//         const existingRestaurant = await Restaurant.findOne({ restaurantName: req.body.restaurantName });
//         if (existingRestaurant) {
//             res.status(409).json({ message: "Restaurant already exists" });
//             return;
//         }

//         if (!req.file) {
//             res.status(400).json({ message: "Image file is required" });
//             return;
//         }

//         const image = req.file as Express.Multer.File;
//         const base64Image = Buffer.from(image.buffer).toString("base64");
//         const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//         const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

//         // Create a new restaurant document.
//         // Here, instead of using req.userId, you may either set a default or use a value from req.body.
//         const restaurant = new Restaurant({
//             ...req.body,
//             imageUrl: uploadResponse.url,
//             user: req.body.user || null, // Remove or set default if needed
//             lastUpdated: new Date(),
//         });

//         await restaurant.save();

//         res.status(201).json(restaurant);
//     } catch (error) {
//         console.error("Error creating restaurant:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// export default {
//     createMyRestaurant,
// };

"use strict";
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import multer from "multer"; // ✅ Correct import


const createMyRestaurant = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if a restaurant with the same name already exists
    const existingRestaurant = await Restaurant.findOne({ restaurantName: req.body.restaurantName });
    if (existingRestaurant) {
      res.status(409).json({ message: "Restaurant already exists" });
      return;
    }

    // Ensure an image file was uploaded
    if (!req.file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }

    // Convert the image buffer to a base64 string and create a data URI
    
    const image = req.file as Express.Multer.File;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

    // Create a new restaurant document using the request body data and additional fields
    const restaurant = new Restaurant({
      ...req.body,
      imageUrl: uploadResponse.url,
      // Since no auth is used, you can optionally assign user from req.body or leave it null
      user: req.body.user || null,
      lastUpdated: new Date(),
    });

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
      const restaurants = await Restaurant.find();
      res.status(200).json(restaurants);
    } catch (error) {
      console.error("Error retrieving restaurants:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  
  // Update restaurant details
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

    let imageUrl = restaurant.imageUrl; // Default to existing image

    if (req.file) {
      const image = req.file as Express.Multer.File;
      const base64Image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64Image}`;

      // Upload new image to Cloudinary
      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
      imageUrl = uploadResponse.url;

      // Remove old image from Cloudinary
      const oldImagePublicId = restaurant.imageUrl.split("/").pop()?.split(".")[0]; // Extract Cloudinary public ID
      if (oldImagePublicId) {
        await cloudinary.v2.uploader.destroy(oldImagePublicId);
      }
    }

    // Update restaurant details
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      { ...req.body, imageUrl, lastUpdated: new Date() },
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete a restaurant
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

    // Delete the image from Cloudinary
    const imagePublicId = restaurant.imageUrl.split("/").pop()?.split(".")[0]; // Extract Cloudinary public ID
    if (imagePublicId) {
      await cloudinary.v2.uploader.destroy(imagePublicId);
    }

    await Restaurant.findByIdAndDelete(id);
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
