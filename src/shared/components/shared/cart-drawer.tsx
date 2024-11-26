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
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

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
        <SheetHeader>
          <SheetTitle>
            In Cart <span className="font-bold">{items.length} items</span>
          </SheetTitle>
        </SheetHeader>

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
      </SheetContent>
    </Sheet>
  );
};
