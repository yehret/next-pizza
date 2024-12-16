import { notFound } from "next/navigation";
import { prisma } from "../../../../../../prisma/prisma-client";
import { ChooseProductModal } from "@/shared/components/shared";

export default async function ProductModalPage({ params }: { params: { id: string } }) {
   const product = await prisma.product.findFirst({
     where: {
       id: Number(params.id), // Convert the string `id` to a number
     },
     include: {
       ingredients: true,
       items: true,
     },
   });
 
   if (!product) {
     return notFound();
   }
 
   return <ChooseProductModal product={product} />;
 }
 