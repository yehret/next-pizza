'use client';

import React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            In Cart <span className="font-bold">3 items</span>
          </SheetTitle>
        </SheetHeader>

        <div className="-mx-6 mt-5 overflow-auto flex-1">
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                'https://media.dodostatic.com/image/r:292x292/11EE8739E55F5BCE89E33C950E9F9698.avif'
              }
              details={getCartItemDetails(1, 30, [
                { name: 'Cheese border' },
                { name: 'Creamy mozzarella' },
                { name: 'Cheddar and parmesan cheese' },
                { name: 'Hot pepper jalapeno' },
                { name: 'Tender chicken' },
              ])}
              name={'Chorizo Freash'}
              price={34}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                'https://media.dodostatic.com/image/r:292x292/11EE8739E55F5BCE89E33C950E9F9698.avif'
              }
              details={getCartItemDetails(1, 30, [
                { name: 'Cheese border' },
                { name: 'Creamy mozzarella' },
                { name: 'Cheddar and parmesan cheese' },
                { name: 'Hot pepper jalapeno' },
                { name: 'Tender chicken' },
              ])}
              name={'Chorizo Freash'}
              price={34}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                'https://media.dodostatic.com/image/r:292x292/11EE8739E55F5BCE89E33C950E9F9698.avif'
              }
              details={getCartItemDetails(1, 30, [
                { name: 'Cheese border' },
                { name: 'Creamy mozzarella' },
                { name: 'Cheddar and parmesan cheese' },
                { name: 'Hot pepper jalapeno' },
                { name: 'Tender chicken' },
              ])}
              name={'Chorizo Freash'}
              price={34}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                'https://media.dodostatic.com/image/r:292x292/11EE8739E55F5BCE89E33C950E9F9698.avif'
              }
              details={getCartItemDetails(1, 30, [
                { name: 'Cheese border' },
                { name: 'Creamy mozzarella' },
                { name: 'Cheddar and parmesan cheese' },
                { name: 'Hot pepper jalapeno' },
                { name: 'Tender chicken' },
              ])}
              name={'Chorizo Freash'}
              price={34}
              quantity={1}
            />
          </div>
          <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl={
                'https://media.dodostatic.com/image/r:292x292/11EE8739E55F5BCE89E33C950E9F9698.avif'
              }
              details={getCartItemDetails(1, 30, [
                { name: 'Cheese border' },
                { name: 'Creamy mozzarella' },
                { name: 'Cheddar and parmesan cheese' },
                { name: 'Hot pepper jalapeno' },
                { name: 'Tender chicken' },
              ])}
              name={'Chorizo Freash'}
              price={34}
              quantity={1}
            />
          </div>
        </div>

        <SheetFooter className="-mx-6 mg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Total
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">123 $</span>
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
