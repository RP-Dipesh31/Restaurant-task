// components/PaymentForm.tsx
import {
    CardElement,
    useStripe,
    useElements,
  } from "@stripe/react-stripe-js";
  import { useState } from "react";
  
  const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!stripe || !elements) return;
  
      setLoading(true);
  
      const cardElement = elements.getElement(CardElement);
  
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement!,
      });
  
      if (error) {
        setMessage(error.message ?? "Payment failed.");
        setLoading(false);
        return;
      }
  
      // Normally you'd send `paymentMethod.id` to your backend to create the charge
      setMessage("Payment method created: " + paymentMethod.id);
      setLoading(false);
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="border p-3 rounded" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {message && <p className="text-sm text-red-500">{message}</p>}
      </form>
    );
  };
  
  export default PaymentForm;
  