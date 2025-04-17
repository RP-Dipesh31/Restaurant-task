// src/routes/restaurantRoutes.ts
import express from "express";
import { createRestaurant, getRestaurants, deleteRestaurant, updateRestaurant } from "../controllers/MyRestaurantController";
import multer from "multer";
import path from "path";
import fs from 'fs';

const uploadPath = path.join(__dirname, '../../uploadImages');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check if the directory exists
    if (!fs.existsSync(uploadPath)) {
      // Create the directory recursively
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/restaurants", upload.single("imageFile"), createRestaurant);
router.put("/restaurants/:id", upload.single("imageFile"), updateRestaurant);

router.post("/restaurants", createRestaurant);
router.get("/restaurants", getRestaurants);
router.put("/restaurants/:id", updateRestaurant);
router.delete("/restaurants/:id", deleteRestaurant);

export default router;
