import { error } from "console";
import { Request, Response} from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

const createMyRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const existingRestaurant = await Restaurant.find({user: req.userId});

        if(existingRestaurant){
           // return res.status(409).json({message: "User restaurant already exists"});
           res.status(409).json({ message: "User restaurant already exists" });
           return;
        }

        if (!req.file) {
            res.status(400).json({ message: "Image file is required" });
            return;
        }

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:$(image.mimetype);base64,${base64Image}`;

        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);

        const restaurant = new Restaurant(req.body);
        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();
        await restaurant.save();

        res.status(201).send(restaurant);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export default{
    createMyRestaurant,
}