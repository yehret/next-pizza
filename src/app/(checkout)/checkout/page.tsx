'use client'

import React from 'react';
import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutAddressForm, CheckoutCart, CheckoutPersonalForm } from "@/shared/components";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

export default function CheckoutPage() {
   const [submitting, setSubmitting] = React.useState(false);
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

   const onSubmit = async (data: CheckoutFormValues) => {
      try {
         setSubmitting(true);
         const url = await createOrder(data);

         toast.error('Order accepted! 📝 Redirecting to payment... ', {
            icon: '✅',
          });

         if(url) location.href = url;
         
      } catch (error) {
         console.log(error);
         setSubmitting(false);
         toast.error('Failed to create order', {
            icon: '❌'
         })
      }
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
                     <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                  </div>
                  
               </div>
            </form>
         </FormProvider>
      </Container>
   )
}