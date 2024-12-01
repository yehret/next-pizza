import { CheckoutItem, CheckoutItemDetails, Container, Title, WhiteBlock } from "@/shared/components/shared";
import { Button, Input, Textarea } from "@/shared/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

export default function Checkout() {
   return (
      <Container className="mt-10">
         <Title text="Your order" className="font-extrabold mb-8 text-[36px]"/>
         
         <div className="flex gap-10">
            {/* Left side */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
               <WhiteBlock title="1. Cart">
                  <div className="flex flex-col gap-5">
                     <CheckoutItem id={0} imageUrl={"https://media.dodostatic.com/image/r:292x292/11EE87464C2BF76CBD2D76B7567BA5A0.avif"} details={"Chicken, extra cheese, tomato"} name={"Chorizo Fresh"} price={12} quantity={1} />
                     <CheckoutItem id={0} imageUrl={"https://media.dodostatic.com/image/r:292x292/11EE87464C2BF76CBD2D76B7567BA5A0.avif"} details={"Chicken, extra cheese, tomato"} name={"Chorizo Fresh"} price={12} quantity={1} />
                     <CheckoutItem id={0} imageUrl={"https://media.dodostatic.com/image/r:292x292/11EE87464C2BF76CBD2D76B7567BA5A0.avif"} details={"Chicken, extra cheese, tomato"} name={"Chorizo Fresh"} price={12} quantity={1} />
                  </div>  
               </WhiteBlock>

               <WhiteBlock title="2. Personal information">
                  <div className="grid grid-cols-2 gap-5">
                     <Input name="firstName" className="text-base" placeholder="First name" />
                     <Input name="lastName" className="text-base" placeholder="Last name" />
                     <Input name="email" className="text-base" placeholder="E-Mail" />
                     <Input name="phone" className="text-base" placeholder="Phone" />
                  </div>
               </WhiteBlock>

               <WhiteBlock title="3. Delivery">
                  <div className="flex flex-col gap-5">
                     <Input name="address" className="text-base" placeholder="Enter address" /> 
                     <Textarea 
                        rows={5}
                        className="text-base"
                        placeholder="Order commentary"
                     />
                  </div>
               </WhiteBlock>
            </div>

            {/* Right side */}
            <div className="w-[450px]">
               <WhiteBlock className="p-6 sticky top-4">
                  {/* Total price */}
                  <div className="flex flex-col gap-1">
                     <span className="text-xl">Total:</span>
                     <span className="h-11 text-[34px] font-extrabold">{1234} $</span>
                  </div>

                  <CheckoutItemDetails 
                     title={
                        <div className="flex items-center">
                           <Package size={18} className="mr-2 text-gray-400" />
                           Cart price:
                        </div>
                     } 
                     value={1200}/
                  >

                  <CheckoutItemDetails 
                     title={
                        <div className="flex items-center">
                           <Percent size={18} className="mr-2 text-gray-400" />
                           Fee:
                        </div>
                     } 
                     value={14}
                  />

                  <CheckoutItemDetails 
                     title={
                        <div className="flex items-center">
                           <Truck size={18} className="mr-2 text-gray-400" />
                           Delivery:
                        </div>
                     } 
                     value={20}
                  />

                  <Button
                     type="submit"
                     className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                     Checkout
                     <ArrowRight className="w-5 ml-2" />
                  </Button>
               </WhiteBlock>
            </div>
         </div>
      </Container>
   )
}