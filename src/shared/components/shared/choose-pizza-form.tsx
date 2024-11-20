import { cn } from '@/shared/lib/utils';
import React from 'react'
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { IngredientItem } from './ingredient-item';
import { getPizzaDetails } from '@/shared/lib';
import { usePizzaOptions } from '@/shared/hooks/use-pizza-options';

interface Props {
   imageUrl: string;
   name: string;
   ingredients: Ingredient[];
   items: ProductItem[];
   loading?: boolean;
   onClickAddCart: VoidFunction;
   // onSubmit: (itemId: number, ingredients: number[]) => void;
   className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
   name,
   items,
   imageUrl,
   ingredients,
   loading,
   onClickAddCart,
   className, }) => {
   const { size, type, availableSizes, selectedIngredients, setSize, setType, addIngredient } =
      usePizzaOptions(items)
   const { textDetails, totalPrice } = 
      getPizzaDetails(items, type, size, ingredients, selectedIngredients)

   const handleClickAdd = () => {
      onClickAddCart?.()
      console.log({
         size, type, ingredients: selectedIngredients
      });
   }

   return (
      <div className={cn(className, 'flex flex-1')}>
         <PizzaImage src={imageUrl} size={size} />

         <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />            

            <p className="text-gray-400">{textDetails}</p>
 
            <div className="flex flex-col gap-4 mt-5">
               <GroupVariants
                  items={availableSizes}
                  value={String(size)}
                  onClick={(value) => setSize(Number(value) as PizzaSize)}
               />
               <GroupVariants
                  items={pizzaTypes}
                  value={String(type)}
                  onClick={(value) => setType(Number(value) as PizzaType)}
               />
            </div>

            <div className="mt-5 bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar">
               <div className="grid grid-cols-3 gap-3">
                  {ingredients.map((item, index) => (
                     <IngredientItem key={index} active={selectedIngredients.has(item.id)} onClick={() => addIngredient(item.id)} imageUrl={item.imageUrl} name={item.name} price={item.price} />
                  ))}
               </div>
            </div>

            <div className="flex flex-col gap-4 mt-5">
               <Button
                  onClick={handleClickAdd}
                  className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                  Add to cart for {totalPrice} $
               </Button>
            </div>
         </div>
      </div>
   )
}