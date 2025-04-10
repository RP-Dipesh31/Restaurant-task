import express from "express";
import {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuItemController";

const router = express.Router();

router.post("/menu-items", createMenuItem);
router.get("/menu-items", getMenuItems);
router.put("/menu-items/:id", updateMenuItem);
router.delete("/menu-items/:id", deleteMenuItem);

export default router;
