import React from 'react'
import { WhiteBlock } from './white-block';
import { Button } from '../ui';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { CheckoutItemDetails } from './checkout-item-details';

interface Props {
   totalAmount: number;
   className?: string;
}

const TIP = 5;
const DELIVERY_PRICE = 5;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, className }) => {

   const tipPrice = (totalAmount * TIP) / 100;
   const totalPrice = totalAmount + DELIVERY_PRICE + tipPrice;

   return (
      <WhiteBlock className="p-6 sticky top-4">
         {/* Total price */}
         <div className="flex flex-col gap-1">
            <span className="text-xl">Total:</span>
            <span className="h-11 text-[34px] font-extrabold">{totalPrice} $</span>
         </div>

         <CheckoutItemDetails 
            title={
               <div className="flex items-center">
                  <Package size={18} className="mr-2 text-gray-400" />
                  Cart price:
               </div>
            } 
            value={totalAmount}
         />

         <CheckoutItemDetails 
            title={
               <div className="flex items-center">
                  <Percent size={18} className="mr-2 text-gray-400" />
                  Tip:
               </div>
            } 
            value={tipPrice}
         />

         <CheckoutItemDetails 
            title={
               <div className="flex items-center">
                  <Truck size={18} className="mr-2 text-gray-400" />
                  Delivery:
               </div>
            } 
            value={DELIVERY_PRICE}
         />

         <Button
            type="submit"
            className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
            Checkout
            <ArrowRight className="w-5 ml-2" />
         </Button>
      </WhiteBlock>
   )
}