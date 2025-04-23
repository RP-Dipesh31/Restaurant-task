import { Request, Response } from "express";
import MenuItem from "../models/menuModel";

// Create a new menu item
export const createMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newItem = new MenuItem({
      ...req.body,
      imageUrl: imageUrl,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: "Error creating menu item", error });
  }
};

// Get all menu items
export const getMenuItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const items = await MenuItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu items", error });
  }
};

// Update a menu item
export const updateMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item", error });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      res.status(404).json({ message: "Menu item not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item", error });
  }
};
