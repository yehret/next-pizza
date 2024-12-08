'use server'

import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
   try {
      const cookieStore = cookies();
      const cartToken = cookieStore.get('cartToken')?.value;

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

      

   } catch (error) {
      console.log(error);
      
   }
}