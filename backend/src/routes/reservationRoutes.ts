import express from 'express';
import { createReservation, deleteReservation, getReservationById, getReservations, updateReservation } from '../controllers/reservationController';

const router = express.Router();

// Create a reservation
router.post('/', createReservation);

// Get all reservations
router.get('/', getReservations);


// Get a single reservation by ID
router.get('/:id', getReservationById);

router.put('/:id', updateReservation);

router.delete('/:id', deleteReservation);


export default router;
