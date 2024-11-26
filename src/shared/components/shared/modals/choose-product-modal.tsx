'use client'

import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ProductWithRelations } from "../../../../../@types/prisma";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
   const router = useRouter();

   const firstItem = product.items[0];

   const isPizzaForm = Boolean(product.items[0].pizzaType);
   const addCartItem = useCartStore(state => state.addCartItem)
   const loading = useCartStore(state => state.loading)

   const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
      try {
         const itemId = productItemId ?? firstItem.id

         await addCartItem({
            productItemId: itemId,
            ingredients
         });

         toast.success(`${product.name} added to cart`)
         router.back()

      } catch (error) {
         toast.error('Failed to add product to cart')
         console.log(error)
      }
   }

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <VisuallyHidden>
         <DialogTitle>title</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden',
          className,
        )} aria-describedby={undefined}>
         {isPizzaForm ? (
            <ChoosePizzaForm loading={loading} onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} />
         ) : (
            <ChooseProductForm loading={loading} onSubmit={onSubmit} imageUrl={product.imageUrl} name={product.name} price={firstItem.price}/>
         )}
      </DialogContent>
    </Dialog>
  );
};
