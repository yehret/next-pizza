import { CartStateItem } from '@/shared/lib/get-cart-details';
import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItem } from '../checkout-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
   items: CartStateItem[];
   onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
   removeCartItem: (id: number) => void;
   className?: string;
}

export const CheckoutCart: React.FC<Props> = ({ items, onClickCountButton, removeCartItem, className }) => {
   return (
      <WhiteBlock title="1. Cart">
         <div className="flex flex-col gap-5">
            {items.map(item => (
               <CheckoutItem 
                  key={item.id}
                  id={item.id} 
                  imageUrl={item.imageUrl}  
                  details={getCartItemDetails(item.ingredients, item.pizzaType as PizzaType, item.pizzaSize as PizzaSize)} 
                  name={item.name} 
                  price={item.price} 
                  quantity={item.quantity}
                  disabled={item.disabled}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemove={() => removeCartItem(item.id)}
               />
            ))}
         </div>  
      </WhiteBlock>
   )
};