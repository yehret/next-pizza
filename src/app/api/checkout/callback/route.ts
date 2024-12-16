
import { sendEmail } from '@/shared/lib';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';
import { CartItemDTO } from '@/shared/services/dto/cart-dto';
import { OrderSuccessTemplate } from '@/shared/components/shared/email-templates/order-success';

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming Stripe webhook payload
    const body = (await req.json())
    console.log(body);

    // Get the order ID from the metadata in Stripe
    const orderId = body.data.object.metadata.orderId;
   //  const paymentIntent = body.data.object.payment_intent;

    // Fetch the order from database using the order ID
    const order = await prisma.order.findFirst({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' });
    }

    const isSucceeded = body.data.object.status === 'complete';

    // Update the order status based on whether the payment succeeded or failed
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    // Parse the items (this assumes that items are stored as a JSON string)
    const items = JSON.parse(order.items as string) as CartItemDTO[];

    // If payment was successful, send a success email to the customer
    if (isSucceeded) {
      await sendEmail(
        order.email,
        'Next Pizza / Order succeeded 🎉',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      // Send an email about the failed payment if needed
      // TODO: Create a template for a failed order or payment failure notification
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Stripe Callback] Error:', error);
    return NextResponse.json({ error: 'Server error' });
  }
}
