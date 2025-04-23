import express from "express";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController";
import { upload } from "../middleware/upload";
import MenuItem from "../models/menuModel";

const router = express.Router();

// Create with image upload
router.post("/menu-items", upload.single('image'), createMenuItem);

// Get, update, delete
router.get("/menu-items", getMenuItems);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);

// Get menu items by restaurant
router.get('/restaurants/:id/menu', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    const menuItems = await MenuItem.find({ restaurantId }); // assuming restaurantId is part of your model
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});

export default router;
