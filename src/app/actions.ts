'use server'

import { CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { prisma } from "../../prisma/prisma-client";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
   console.log(data);

   const cartToken = '123'

   await prisma.order.create({
      data: {
         token: cartToken,
         fullName: data.firstName + ' ' + data.lastName,
         email: data.email,
         phone: data.phone,
         address: data.address,
         comment: data.comment,
         totalAmount: 10,
         status: OrderStatus.PENDING,
         items: [],
      }
   })

   return 'https://github.com/yehret'
}