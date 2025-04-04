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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_1 = __importDefault(require("../models/restaurant"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const createMyRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a restaurant with the same name already exists
        const existingRestaurant = yield restaurant_1.default.findOne({ restaurantName: req.body.restaurantName });
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
        const image = req.file;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;
        // Upload the image to Cloudinary
        const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(dataURI);
        // Create a new restaurant document using the request body data and additional fields
        const restaurant = new restaurant_1.default(Object.assign(Object.assign({}, req.body), { imageUrl: uploadResponse.url, 
            // Since no auth is used, you can optionally assign user from req.body or leave it null
            user: req.body.user || null, lastUpdated: new Date() }));
        yield restaurant.save();
        res.status(201).json(restaurant);
    }
    catch (error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_1.default.find();
        res.status(200).json(restaurants);
    }
    catch (error) {
        console.error("Error retrieving restaurants:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Update restaurant details
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid restaurant ID" });
            return;
        }
        const restaurant = yield restaurant_1.default.findById(id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }
        let imageUrl = restaurant.imageUrl; // Default to existing image
        if (req.file) {
            const image = req.file;
            const base64Image = Buffer.from(image.buffer).toString("base64");
            const dataURI = `data:${image.mimetype};base64,${base64Image}`;
            // Upload new image to Cloudinary
            const uploadResponse = yield cloudinary_1.default.v2.uploader.upload(dataURI);
            imageUrl = uploadResponse.url;
            // Remove old image from Cloudinary
            const oldImagePublicId = (_a = restaurant.imageUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]; // Extract Cloudinary public ID
            if (oldImagePublicId) {
                yield cloudinary_1.default.v2.uploader.destroy(oldImagePublicId);
            }
        }
        // Update restaurant details
        const updatedRestaurant = yield restaurant_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, req.body), { imageUrl, lastUpdated: new Date() }), { new: true });
        res.status(200).json(updatedRestaurant);
    }
    catch (error) {
        console.error("Error updating restaurant:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
// Delete a restaurant
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid restaurant ID" });
            return;
        }
        const restaurant = yield restaurant_1.default.findById(id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurant not found" });
            return;
        }
        // Delete the image from Cloudinary
        const imagePublicId = (_a = restaurant.imageUrl.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0]; // Extract Cloudinary public ID
        if (imagePublicId) {
            yield cloudinary_1.default.v2.uploader.destroy(imagePublicId);
        }
        yield restaurant_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: "Restaurant deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting restaurant:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.default = {
    createMyRestaurant,
    getRestaurants,
    updateRestaurant,
    deleteRestaurant,
};
