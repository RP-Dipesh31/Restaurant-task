// "use strict";

// import express from 'express';
// import multer from 'multer';
// import MyRestaurantController from '../controllers/MyRestaurantController';
// import { validateMyRestaurantRequest } from '../middleware/validation';

// const router = express.Router();

// // Memory storage for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // GET all restaurants
// router.get("/", (req, res) => {
//   console.log("GET /api/restaurants called");
//   MyRestaurantController.getRestaurants(req, res);
// });

// // POST create a new restaurant
// router.post(
//   "/",
//   upload.single("imageFile"),             // Handles image upload
//   ...validateMyRestaurantRequest,         // Validation middleware
//   (req, res) => {
//     console.log("POST /api/restaurants called");
//     MyRestaurantController.createMyRestaurant(req, res);
//   }
// );

// // PUT update a restaurant
// router.put(
//   "/:id",
//   upload.single("imageFile"),             // Optional image upload
//   (req, res) => {
//     console.log(`PUT /api/restaurants/${req.params.id} called`);
//     MyRestaurantController.updateRestaurant(req, res);
//   }
// );

// // DELETE a restaurant
// router.delete("/:id", (req, res) => {
//   console.log(`DELETE /api/restaurants/${req.params.id} called`);
//   MyRestaurantController.deleteRestaurant(req, res);
// });

// export default router;



// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import MyRestaurantController from '../controllers/MyRestaurantController';
// import { validateMyRestaurantRequest } from '../middleware/validation';

// const router = express.Router();

// // Configure Multer to save files to disk
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Ensure this directory exists
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Serve static files from the 'uploads' directory
// router.use('/uploads', express.static('uploads'));

// // GET all restaurants
// router.get("/", MyRestaurantController.getRestaurants);

// // POST create a new restaurant
// router.post(
//   "/",
//   upload.single("imageFile"),             // Handles image upload
//   validateMyRestaurantRequest,            // Validation middleware
//   MyRestaurantController.createMyRestaurant
// );

// // PUT update a restaurant
// router.put(
//   "/:id",
//   upload.single("imageFile"),             // Optional image upload
//   MyRestaurantController.updateRestaurant
// );

// // DELETE a restaurant
// router.delete("/:id", MyRestaurantController.deleteRestaurant);

// export default router;

import express from 'express';
import multer from 'multer';
import path from 'path';
import MyRestaurantController from '../controllers/MyRestaurantController';
import { validateMyRestaurantRequest } from '../middleware/validation';

const router = express.Router();

// Configure Multer to save files to disk in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this directory exists in your project root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files from 'uploads' directory
router.use('/uploads', express.static('uploads'));

// GET all restaurants
router.get("/", MyRestaurantController.getRestaurants);

// POST create a new restaurant
router.post(
  "/",
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.createMyRestaurant
);

// PUT update a restaurant
router.put(
  "/:id",
  upload.single("imageFile"),
  MyRestaurantController.updateRestaurant
);

// DELETE a restaurant
router.delete("/:id", MyRestaurantController.deleteRestaurant);

export default router;


