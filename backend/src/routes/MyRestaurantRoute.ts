
"use strict";
import express from 'express';
import multer from 'multer';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.get("/", (req, res) => {
  console.log("GET /api/restaurants called");
  MyRestaurantController.getRestaurants(req, res);
});

router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  (req: express.Request, res: express.Response) => {
    console.log("POST /api/restaurants called");
    MyRestaurantController.createMyRestaurant(req, res);
  }
);

export default router;
