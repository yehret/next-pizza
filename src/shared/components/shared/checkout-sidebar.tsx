import React from 'react'
import { WhiteBlock } from './white-block';
import { Button, Skeleton } from '../ui';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { CheckoutItemDetails } from './checkout-item-details';

interface Props {
   totalAmount: number;
   className?: string;
   loading?: boolean;
}

const TIP = 5;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {

   const tipPrice = (totalAmount * TIP) / 100;
   const totalPrice = totalAmount + DELIVERY_PRICE + tipPrice;

   return (
      <WhiteBlock className="p-6 sticky top-4">
         {/* Total price */}
         <div className="flex flex-col gap-1">
            <span className="text-xl">Total:</span>
            {loading ? <Skeleton className='w-48 h-11' /> : <span className="h-11 text-[34px] font-extrabold">{totalPrice} $</span>}
         </div>

         <CheckoutItemDetails 
            title={
               <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Cart price:
               </div>
            } 
            value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} $`}
         />

         <CheckoutItemDetails 
            title={
               <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Tip:
               </div>
            } 
            value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${tipPrice} $`}
         />

         <CheckoutItemDetails 
            title={
               <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Delivery:
               </div>
            } 
            value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} $`}
         />

         <Button
            loading={loading}
            type="submit"
            className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
            Checkout
            <ArrowRight className="w-5 ml-2" />
         </Button>
      </WhiteBlock>
   )
}