import { notFound } from "next/navigation"
import { prisma } from "../../../../../prisma/prisma-client"
import { Container, GroupVariants, PizzaImage, Title } from "@/shared/components/shared"

export default async function ProductPage({ params }: { params: { id: string } }) {
   const { id } = await params;
   if (!id) return notFound();
   
   const product = await prisma.product.findFirst({ where: { id: Number(id) }})

   if (!product) {
      return notFound()
   }

   return (
      <Container className="flex flex-col my-10">
         <div className="flex flex-1">
            <PizzaImage src={product.imageUrl} size={40} />

            <div className="w-[490px] bg-[#F7F6F5] p-7">
               <Title text={product.name} size="md" className="font-extrabold mb-1"/>

               <p className="text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni accusamus aut magnam fugit atque numquam cum assumenda labore reiciendis natus.</p>
            
               <GroupVariants value="2" items={[{ name: 'Small', value: '1'}, { name: 'Medium', value: '2'}, { name: 'Large', value: '3'}]}/>
            </div>
         </div>
      </Container>
   )
}