export type StripePaymentCallbackData = {
   id: string; // Event ID
   object: string; // Always "event"
   created: number; // Timestamp when the event was created
   data: {
     object: {
       id: string; // PaymentIntent ID (or CheckoutSession ID)
       object: string; // Always "payment_intent" or "checkout.session"
       amount_received: number; // Total amount received (in cents)
       currency: string; // Currency, e.g., "usd"
       status: string; // Payment status (e.g., "succeeded", "failed")
       description: string; // Description of the payment
       metadata: {
         order_id: string; // The order ID from your system (you set this during checkout)
       };
       receipt_email: string; // Customer email
     };
   };
   livemode: boolean; // Whether the event came from live mode or test mode
   request: {
     id: string; // Request ID
     idempotency_key: string; // Idempotency key
   };
 };
 