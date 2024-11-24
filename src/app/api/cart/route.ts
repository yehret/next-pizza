import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

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
      console.log(error);
   }
}