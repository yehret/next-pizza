'use server'

import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { getUserSession, sendEmail } from "@/shared/lib";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { createPayment } from "@/shared/lib/create-payment";
import { hashSync } from "bcrypt";

export async function createOrder(data: CheckoutFormValues) {
   try {
      const cookieStore = cookies();
      const cartToken = (await cookieStore).get('cartToken')?.value;

      if(!cartToken) throw new Error('Cart token is missing');

      // Find cart by token
      const userCart = await prisma.cart.findFirst({
         include: {
            user: true,
            items: {
               include: {
                  ingredients: true,
                  productItem: {
                     include: {
                        product: true,
                     }
                  }
               }
            }
         },
         where: {
            token: cartToken
         }
      })

      // If cart not found, throwing error
      if(!userCart) throw new Error('Cart not found');

      if(userCart?.totalAmount === 0) throw new Error('Cart is empty');

      // Creating an order
      const order = await prisma.order.create({
         data: {
            token: cartToken,
            fullName: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment,
            totalAmount: userCart.totalAmount,
            status: OrderStatus.PENDING,
            items: JSON.stringify(userCart.items),
          },
      })

      // Emptying the cart
      await prisma.cart.update({
         where: {
            id: userCart.id
         },
         data: {
            totalAmount: 0
         }
      })

      // Deleting cart items, that were added to the cart
      await prisma.cartItem.deleteMany({
         where: {
            cartId: userCart.id
         }
      })

      // Payment algorythm
      const paymentData = await createPayment({
         amount: order.totalAmount,
         orderId: order.id,
         description: "Order payment #" + order.id
      })

      if(!paymentData) {
         throw new Error('Payment has been failed')
      }

      await prisma.order.update({
         where: {
           id: order.id,
         },
         data: {
           paymentId: paymentData.id,
         },
       });

      const paymentUrl = paymentData.url!;

      await sendEmail(
         data.email,
         "NextPizza / Order payment #" + order.id,
         PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl,
         })
      )

      return paymentUrl;
   } catch (error) {
      console.log('[CreateOrder] Server error', error);
   }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
   try {
     const currentUser = await getUserSession();
 
     if (!currentUser) {
       throw new Error('User not found');
     }
 
     const findUser = await prisma.user.findFirst({
       where: {
         id: Number(currentUser.id),
       },
     });
 
     await prisma.user.update({
       where: {
         id: Number(currentUser.id),
       },
       data: {
         fullName: body.fullName,
         email: body.email,
         password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
       },
     });
   } catch (err) {
     console.log('Error [UPDATE_USER]', err);
     throw err;
   }
 }