'use client'

import React from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
   title: string;
   items: Item[];
   defaultItems?: Item[];
   limit?: number;
   searchInputPlaceholder?: string;
   loading?: boolean;
   className?: string;
   onClickCheckBox?: (id: string) => void;
   defaultValue?: string[];
   selectedIds?: Set<string>;
   name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
   title,
   items,
   defaultItems,
   limit = 5,
   searchInputPlaceholder = 'Search...',
   className,
   onClickCheckBox,
   defaultValue,
   selectedIds,
   loading,
   name
 }) => {
   const [showAll, setShowAll] = React.useState(false);
   const [searchValue, setSearchValue] = React.useState('');

   if (loading) {
      return (
         <div className={className}>
            <p className="font-bold mb-3">{title}</p>
            {
               [...Array(limit)].map((_, index) => (
                  <Skeleton key={index} className="h-6 mb-4 rounded-[8px]"/>
               ))
            }
            <Skeleton className="w-28 h-6 mb-4 rounded-[8px]"/>
         </div>
      )
   }

   const list = showAll
      ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
      : defaultItems?.slice(0, limit);

   const onChangeSearchInput = (value: string) => {
      setSearchValue(value);
   }

   return (
      <div className={className}>
         <p className="font-bold mb-3">{title}</p>

         {showAll && (
            <div className="mb-5">
               <Input onChange={e => onChangeSearchInput(e.target.value)} placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
            </div>
         )}

        <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, index) => (
               <FilterCheckbox
               key={index}
               text={item.text}
               value={item.value}
               endAdornment={item.endAdornment}
               checked={selectedIds?.has(item.value)}
               onCheckedChange={() => onClickCheckBox?.(item.value)}
               name={name}
             />
            ))}
        </div>

        {items.length > limit && (
            <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
               <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                  {showAll ? 'Hide' : '+ Show All'}
               </button>
            </div>
        )}
      </div>
   )
}