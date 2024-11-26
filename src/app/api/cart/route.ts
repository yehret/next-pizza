import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import crypto from "crypto"
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart-dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

// youtube timecode: 11:18:00
export async function GET(req: NextRequest) {
   try {
      const token = req.cookies.get('cartToken')?.value

      if(!token) return NextResponse.json({ totalAmount: 0, items: [] })

      const userCart = await prisma.cart.findFirst({ 
         where: {
            OR: [
               {
                  token,
               },
            ],
         },
         include: {
            items: {
               orderBy: {
                  createdAt: 'desc'
               },
               include: {
                  productItem: {
                     include: {
                        product: true,
                     }
                  },
                  ingredients: true
               }
            }
         }
       })

      return NextResponse.json(userCart)
   } catch (error) {
      console.log('[CART-GET] Server Error: ' + error);
      return NextResponse.json({ message: "Cart fetching failed" }, { status: 500 })
   }
}

export async function POST(req: NextRequest) {
   try {
      let token = req.cookies.get('cartToken')?.value;

      if(!token) {
         token = crypto.randomUUID()
      }

      const userCart = await findOrCreateCart(token)

      const data = (await req.json()) as CreateCartItemValues;

      const findCartItem = await prisma.cartItem.findFirst({
         where: {
            cartId: userCart.id,
            productItemId: data.productItemId,
            ingredients: { every: { id: { in: data.ingredients } } }
         }
      })

      if(findCartItem) {
         await prisma.cartItem.update({
            where: { id: findCartItem.id },
            data: {
               quantity: findCartItem.quantity + 1 
            }
         })
      } else {
         await prisma.cartItem.create({
            data: {
               cartId: userCart.id,
               productItemId: data.productItemId,
               quantity: 1,
               ingredients: {
                  connect: data.ingredients?.map(ingredientId => ({ id: ingredientId }))
                }
            }
         })
      }

      const updatedUserCart = await updateCartTotalAmount(token);

      const res = NextResponse.json(updatedUserCart)
      
      res.cookies.set('cartToken', token)

      return res;

   } catch (error) {
      console.log('[CART-POST] Server Error: ' + error);
      return NextResponse.json({ message: "Cart creation failed" }, { status: 500 })
   }
}