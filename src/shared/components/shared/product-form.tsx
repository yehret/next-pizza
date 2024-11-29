'use client'

import toast from "react-hot-toast";
import { ProductWithRelations } from "../../../../@types/prisma";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";
import { useCartStore } from "@/shared/store";

interface Props {
   product: ProductWithRelations,
   onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
   const addCartItem = useCartStore(state => state.addCartItem)
   const loading = useCartStore(state => state.loading)

   const firstItem = product.items[0];
   const isPizzaForm = Boolean(product.items[0].pizzaType);   

   
   const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
      try {
         const itemId = productItemId ?? firstItem.id

         await addCartItem({
            productItemId: itemId,
            ingredients
         });

         toast.success(`${product.name} added to cart`)
         _onSubmit?.()
      } catch (error) {
         toast.error('Failed to add product to cart')
         console.log(error)
      }
   }

   if (isPizzaForm) {
      return (
         <ChoosePizzaForm loading={loading} onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />
      )
   }

   return (
      <ChooseProductForm loading={loading} onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} price={firstItem.price}/>
   )
}