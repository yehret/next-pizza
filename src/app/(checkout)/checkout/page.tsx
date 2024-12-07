'use client'

import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";

export default function CheckoutPage() {
   const { totalAmount, items, updateItemQuantity, removeCartItem, loading } = useCart()

   const form = useForm<CheckoutFormValues>({
      resolver: zodResolver(checkoutFormSchema),
      defaultValues: {
         email: '',
         firstName: '',
         lastName: '',
         phone: '',
         address: '',
         comment: '',
       },
   })

   const onSubmit = (data: CheckoutFormValues) => {
      console.log(data);
   }

   // TODO: move this function to useCart hook
   const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   }

   return (
      <Container className="mt-10">
         <Title text="Your order" className="font-extrabold mb-8 text-[36px]"/>
         
         <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="flex gap-10">
                  {/* Left side */}
                  <div className="flex flex-col gap-10 flex-1 mb-20">
                     <CheckoutCart 
                        items={items} 
                        onClickCountButton={onClickCountButton} 
                        removeCartItem={removeCartItem}
                        loading={loading}
                     />

                     <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

                     <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
                  </div>

                  {/* Right side */}
                  <div className="w-[450px]">
                     <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                  </div>
                  
               </div>
            </form>
         </FormProvider>
      </Container>
   )
}