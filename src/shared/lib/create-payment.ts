import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface PaymentData {
  amount: number; // Amount in cents
  orderId: number; // Unique order ID
  description: string; // Description of the payment
}

export async function createPayment(data: PaymentData) {
  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Specify payment methods, e.g., card
      line_items: [
        {
          price_data: {
            currency: 'usd', // Change to your preferred currency
            product_data: {
              name: `Order #${data.orderId}`, // Displayed on the checkout page
              description: data.description,
            },
            unit_amount: data.amount * 100, // Amount in cents
          },
          quantity: 1, // Quantity of the item
        },
      ],
      mode: 'payment', // Ensures the user completes payment
      success_url: `${process.env.STRIPE_SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`, // Redirect after success
      cancel_url: `${process.env.STRIPE_CANCEL_URL}?order_id=${data.orderId}`, // Redirect after cancellation
      metadata: {
        orderId: data.orderId, // Track order ID
      },
    });

    return {
      id: session.id, // Return Payment ID (Transaction ID)
      url: session.url, // URL for the Stripe-hosted checkout page
    };

  } catch (error) {
    console.error('[CreatePayment] Error creating checkout session:', error);
    throw new Error('Unable to create payment session');
  }
}
