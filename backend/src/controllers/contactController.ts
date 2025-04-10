import { Request, Response } from "express";
import Contact from "../models/Contact";

export const submitContactForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            res.status(400).json({ error: "All fields are required." });
            return;
        }

        const newContact = new Contact({ name, email, message });
        await newContact.save();

        res.status(201).json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
