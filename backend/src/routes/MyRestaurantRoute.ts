"use strict";

import express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

// Memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all restaurants
router.get("/", (req, res) => {
  console.log("GET /api/restaurants called");
  MyRestaurantController.getRestaurants(req, res);
});

// POST create a new restaurant
router.post(
  "/",
  upload.single("imageFile"),             // Handles image upload
  ...validateMyRestaurantRequest,         // Validation middleware
  (req, res) => {
    console.log("POST /api/restaurants called");
    MyRestaurantController.createMyRestaurant(req, res);
  }
);

// PUT update a restaurant
router.put(
  "/:id",
  upload.single("imageFile"),             // Optional image upload
  (req, res) => {
    console.log(`PUT /api/restaurants/${req.params.id} called`);
    MyRestaurantController.updateRestaurant(req, res);
  }
);

// DELETE a restaurant
router.delete("/:id", (req, res) => {
  console.log(`DELETE /api/restaurants/${req.params.id} called`);
  MyRestaurantController.deleteRestaurant(req, res);
});

export default router;
