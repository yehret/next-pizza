'use client'

import React from 'react';
import { useIntersection } from 'react-use'
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/shared/store/category';

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, categoryId, listClassName, className }) => {
   const intersectionRef = React.useRef(null)
   const intersection = useIntersection(intersectionRef, { threshold: 0.4 });
   const setActiveCategoryId = useCategoryStore(state => state.setActiveId)

   React.useEffect(() => {
      if(intersection?.isIntersecting) {
         setActiveCategoryId(categoryId)
      }
   }, [categoryId, intersection?.isIntersecting, setActiveCategoryId, title])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product, i) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            count={i % 2}
          />
        ))}
      </div>
    </div>
  );
};
