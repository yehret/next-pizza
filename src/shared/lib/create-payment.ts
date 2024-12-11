import axios from 'axios'

interface Props {
   description: string;
   orderId: number;
   amount: number;
}

export async function createPayment(details: Props) {
   const { data } = await axios.post('https://api.stripe.com/v1/checkout/sessions',
      new URLSearchParams({
         payment_method_types: 'card', // Метод оплати
         line_items: JSON.stringify([
           {
             price_data: {
               currency: 'usd', // Змініть валюту, якщо потрібно
               product_data: {
                 name: details.description,
               },
               unit_amount: details.amount * 100, // Stripe працює з найменшими одиницями валюти (наприклад, копійками)
             },
             quantity: 1,
           },
         ]),
         mode: 'payment', // Тип сесії
         // success_url: `${process.env.STRIPE_SUCCESS_URL}?order_id=${details.orderId}`,
         // cancel_url: `${process.env.STRIPE_CANCEL_URL}?order_id=${details.orderId}`,
       }),
       {
         headers: {
           Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
           'Content-Type': 'application/x-www-form-urlencoded',
           'Idempotence-Key': Math.random().toString(36).substring(7),
         },
       },
   )

   return data;
}