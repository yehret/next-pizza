'use client'

import { cn } from '@/lib/utils';
import React from 'react';
import { useCategoryStore } from '../../../store/category';

interface Props {
  className?: string;
}

const cats: string[] = ['Pizzas', 'Combo', 'Snacks', 'Cocktails', 'Coffee', 'Drinks', 'Deserts', 'Deserts'];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
   const categoryActiveId = useCategoryStore(state => state.activeId)


  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {
         cats.map((cat, index) => (
            <a href={`/#${cat}`} key={index} className={cn('flex items-center fond-bold h-11 rounded-2xl px-5', 
               categoryActiveId === index + 1 && 'bg-white shadow-md shadow-gray-200 text-primary')}>
               <button>
                  {cat}
               </button>
            </a>
         ))
      }
    </div>
  );
};
