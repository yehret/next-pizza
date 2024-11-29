'use client';

import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Title } from './title';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
   const items = useCartStore((state) => state.items)
   const fetchCartItems = useCartStore((state) => state.fetchCartItems)
   const totalAmount = useCartStore((state) => state.totalAmount)
   const updateItemQuantity = useCartStore((state) => state.updateItemQuantity)
   const removeCartItem = useCartStore((state) => state.removeCartItem)

   React.useEffect(() => {
      fetchCartItems()
   }, [])
   
   const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
      const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
      <div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
         {totalAmount > 0 && <SheetHeader>
            <SheetTitle>
               In Cart <span className="font-bold">{items.length} items</span>
            </SheetTitle>
         </SheetHeader>}

         {!totalAmount && (
               <div className="flex flex-col items-center justify-center w-72 mx-auto">
               <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
               <Title size="sm" text="Cart is empty" className="text-center font-bold my-2" />
               <p className="text-center text-neutral-500 mb-5">
                  Add at least one product to make an order
               </p>

               <SheetClose>
                  <Button className="w-56 h-12 text-base" size="lg">
                     <ArrowLeft className="w-5 mr-2" />
                     Go back
                  </Button>
               </SheetClose>
               </div>
            )}

         {totalAmount > 0 && <>
            <div className="-mx-6 mt-5 overflow-auto flex-1">
               {items.map((item) => (
                  <div className="mb-2" key={item.id}>
                     <CartDrawerItem
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={
                           item.pizzaSize && item.pizzaType ?
                           getCartItemDetails(item.pizzaType as PizzaType, item.pizzaSize as PizzaSize, item.ingredients) : ''}
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                        onClickRemove={() => removeCartItem(item.id)}
                     />
               </div>
               ))}
            </div>

            <SheetFooter className="-mx-6 mg-white p-8">
               <div className="w-full">
                  <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                     Total
                     <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>
                  <span className="font-bold text-lg">{totalAmount} $</span>
                  </div>

                  <Link href="/cart">
                  <Button type="submit" className="w-full h-12 text-base">
                     Make order
                     <ArrowRight className="w-5 ml-2" />
                  </Button>
                  </Link>
               </div>
            </SheetFooter>
         </>}
        </div>
      </SheetContent>
    </Sheet>
  );
};
