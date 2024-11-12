import { cn } from '@/lib/utils';
import React from 'react'
import { ProductImage } from './product-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { Ingredient, ProductItem } from '@prisma/client';

interface Props {
   imageUrl: string;
   name: string;
   ingredients: Ingredient[];
   items: ProductItem[];
   loading?: boolean;
   // onSubmit: (itemId: number, ingredients: number[]) => void;
   className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ 
   name,
   items,
   imageUrl,
   ingredients,
   loading,
   className, }) => {
   const totalPrice = 15
   const textDetails = '30sm traditional dough, 590 g'

   console.log(ingredients);
   

   return (
      <div className={cn(className, 'flex flex-1')}>
         <ProductImage src={imageUrl} size={30} />

         <div className="w-[490px] bg-[#f7f6f5] p-7">
            <Title text={name} size="md" className="font-extrabold mb-1" />

            <p className="text-gray-400">{textDetails}</p>
 
            {/* <div className="flex flex-col gap-4 mt-5">
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
         </div>  */}

            <div className="flex flex-col gap-4 mt-5">
               <Button
                  className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                  Add to cart for {totalPrice} $
               </Button>
            </div>
         </div>
      </div>
   )
}