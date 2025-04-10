// src/routes/paymentRoutes.ts
import express from 'express';
import {
  createPaymentIntent,
  saveOrder,
} from '../controllers/PaymentController';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.post('/save-order', saveOrder);

export default router;
