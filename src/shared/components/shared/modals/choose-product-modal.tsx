'use client'

import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ProductWithRelations } from "../../../../../@types/prisma";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { ProductForm } from "../product-form";

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
   const router = useRouter();

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
         <ProductForm product={product} onSubmit={() => router.back()}/>
      </DialogContent>
    </Dialog>
  );
};
