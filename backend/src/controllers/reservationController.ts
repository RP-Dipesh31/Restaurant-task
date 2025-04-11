import { Request, Response } from 'express';
import Reservation, { IReservation } from '../models/Reservation';

// Create a new reservation
export const createReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, date, time, guests } = req.body;

        const newReservation: IReservation = new Reservation({
            name,
            phone,
            date,
            time,
            guests
        });

        await newReservation.save();
        res.status(201).json({ message: '✅ Reservation Created Successfully' });
    } catch (error) {
        console.error('❌ Error Creating Reservation:', error);
        res.status(500).json({ error: '❌ Server Error' });
    }
};

// Get all reservations
export const getReservations = async (req: Request, res: Response): Promise<void> => {
    try {
        const reservations: IReservation[] = await Reservation.find();
        res.json(reservations);
    } catch (error) {
        console.error('❌ Error Fetching Reservations:', error);
        res.status(500).json({ error: '❌ Server Error' });
    }
};

export const updateReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, phone, date, time, guests } = req.body;

        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { name, phone, date, time, guests },
            { new: true, runValidators: true }
        );

        if (!updatedReservation) {
            res.status(404).json({ error: "Reservation not found" });
            return;
        }

        res.status(200).json({ message: "✅ Reservation Updated Successfully", reservation: updatedReservation });
    } catch (error) {
        console.error("❌ Error Updating Reservation:", error);
        res.status(500).json({ error: "❌ Server Error" });
    }
};

export const deleteReservation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedReservation = await Reservation.findByIdAndDelete(id);

        if (!deletedReservation) {
            res.status(404).json({ error: "Reservation not found" });
            return;
        }

        res.status(200).json({ message: "🗑️ Reservation Deleted Successfully" });
    } catch (error) {
        console.error("❌ Error Deleting Reservation:", error);
        res.status(500).json({ error: "❌ Server Error" });
    }
};


