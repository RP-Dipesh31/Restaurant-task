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

    // Ensure an image file was uploaded
    if (!req.file) {
      res.status(400).json({ message: "Image file is required" });
      return;
    }

    const image = req.file as Express.Multer.File;

    // Save the file to the 'uploads' directory with a unique name
    const fileName = `${Date.now()}_${image.originalname}`;
    const uploadPath = path.join(__dirname, "../../uploads", fileName);

    fs.writeFileSync(uploadPath, image.buffer); // Save file locally

    // Parse menuItems from request
    const menuItems: { name: string; price: number }[] = [];
    for (let i = 0; req.body[`menuItems[${i}][name]`]; i++) {
      const name = req.body[`menuItems[${i}][name]`];
      const price = parseFloat(req.body[`menuItems[${i}][price]`]);
      menuItems.push({ name, price });
    }

    const newRestaurant = new Restaurant({
      restaurantName: req.body.restaurantName,
      city: req.body.city,
      country: req.body.country,
      deliveryPrice: parseFloat(req.body.deliveryPrice),
      estimatedDeliveryTime: parseInt(req.body.estimatedDeliveryTime),
      cuisines: req.body["cuisines[]"] instanceof Array ? req.body["cuisines[]"] : [req.body["cuisines[]"]],
      menuItems,
      imageUrl: `/uploads/${fileName}`, // This can be served via Express.static
      lastUpdated: new Date(),
    });

    await newRestaurant.save();
    res.status(201).json({ message: "Restaurant created successfully", restaurant: newRestaurant });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get all restaurants
const getRestaurants = async (req: Request, res: Response): Promise<void> => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error retrieving restaurants:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update restaurant
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

      // Delete old image file
      if (restaurant.imageUrl && restaurant.imageUrl.startsWith("/uploads/")) {
        const oldImagePath = path.join(__dirname, "../../", restaurant.imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      id,
      {
        ...req.body,
        imageUrl,
        lastUpdated: new Date(),
      },
      { new: true }
    );

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Delete restaurant
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default {
  createMyRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
};

