import express from "express";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController";
import { upload } from "../middleware/upload";
import MenuItem from "../models/menuModel"; // Adjust the path based on your project structure

const router = express.Router();

router.post("/menu-items", upload.single('image'), createMenuItem);

router.post("/menu-items", createMenuItem);
router.get("/menu-items", getMenuItems);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);

router.get('/restaurants/:id/menu', async (req, res) => {
  const restaurantId = req.params.id;
  try {
    // Fetch the menu items from your database using restaurantId
    const menuItems = await MenuItem.find({ restaurantId }); // Adjust to your actual model and database query
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu items' });
  }
});


export default router;
