import { notFound } from "next/navigation"
import { prisma } from "../../../../../prisma/prisma-client"
import { Container, ProductForm } from "@/shared/components/shared"

export default async function ProductPage({ params }: { params: { id: string } }) {
   const { id } = await params;
   if (!id) return notFound();
   
   const product = await prisma.product.findFirst({ 
      where: { 
         id: Number(id) 
      },
      include: {
         ingredients: true,
         category: {
            include: {
               products: {
                  include: {
                     items: true,
                  }
               }
            }
         },
         items: true
      }
   })

   if (!product) {
      return notFound()
   }

   return (
      <Container className="flex flex-col my-10">
         <ProductForm product={product} />
      </Container>
   )
}