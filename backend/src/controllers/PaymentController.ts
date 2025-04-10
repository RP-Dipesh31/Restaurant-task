// src/controllers/PaymentController.ts
import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-03-31.basil',
});

// Create Payment Intent
export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Payment intent creation failed' });
  }
};

// Save Order (dummy version for now)
export const saveOrder = async (req: Request, res: Response) => {
  const { userId, items, totalAmount } = req.body;

  try {
    // Replace with actual DB logic
    console.log('Order Data:', { userId, items, totalAmount });

    res.status(200).json({ message: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Order saving failed' });
  }
};
