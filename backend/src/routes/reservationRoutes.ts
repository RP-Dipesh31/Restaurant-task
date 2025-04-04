import express from 'express';
import { createReservation, deleteReservation, getReservations, updateReservation } from '../controllers/reservationController';

const router = express.Router();

// Create a reservation
router.post('/', createReservation);

// Get all reservations
router.get('/', getReservations);

router.put('/:id', updateReservation);

router.delete('/:id', deleteReservation);


export default router;
