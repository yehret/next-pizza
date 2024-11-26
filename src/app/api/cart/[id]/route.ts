import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
   try {
      const id = Number(params.id)
      const data = (await req.json()) as { quantity: number }
      const token = req.cookies.get('cartToken')?.value;

      if(!token) return NextResponse.json({ error: "Cart token is missing" })

      const cartItem = await prisma.cartItem.findFirst({
         where: {
            id,
         }
      });

      if(!cartItem) return NextResponse.json({ error: "Cart item not found" })

      await prisma.cartItem.update({
         where: { id },
         data: {
            quantity: data.quantity
         }
      });

      const updatedUserCart = await updateCartTotalAmount(token);
      return NextResponse.json(updatedUserCart);
   } catch (error) {
      console.log("[CART-PATCH] Server error", error);
      return NextResponse.json({ message: "Updating has been failed"}, { status: 500 });
   }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
   try {
      const id = Number(params.id)
      const token = req.cookies.get('cartToken')?.value;

      if(!token) return NextResponse.json({ error: "Cart token is missing" })

      const cartItem = await prisma.cartItem.findFirst({
         where: {
            id,
         }
      });

      if(!cartItem) return NextResponse.json({ error: "Cart item not found" })

      await prisma.cartItem.delete({
         where: { id }
      });

      const updatedUserCart = await updateCartTotalAmount(token);
      return NextResponse.json(updatedUserCart);
   } catch (error) {
      console.log("[CART-PATCH] Server error", error);
      return NextResponse.json({ message: "Updating has been failed"}, { status: 500 });
   }
}