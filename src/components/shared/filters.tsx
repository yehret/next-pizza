'use client'

import React from 'react'
import { Title } from './title';
import { Button, Input } from '../ui';
import { RangeSlider } from '../ui/range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilters, useIngredients, useQueryFilters } from '../../../hooks';

interface Props {
   className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading } = useIngredients();
   const filters = useFilters();

   useQueryFilters(filters);

   const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }))

   const updatePrices = (prices: number[]) => {
      filters.setPrices('priceFrom', prices[0]);
      filters.setPrices('priceTo', prices[1]);
    };

   return (
      <div className={className}>
         <Title text='Filter' size='sm' className='mb-5 font-bold'/>
         <Button>Clear filter</Button>

         <CheckboxFiltersGroup
            title="Dough type"
            name="pizzaTypes"
            className="mb-5"
            selectedValues={filters.pizzaTypes}
            onClickCheckBox={filters.setPizzaTypes}
            items={[
               { text: 'Thin', value: '1' },
               { text: 'Traditional', value: '2' },
            ]}
            />

         <CheckboxFiltersGroup
            title="Sizes"
            name="sizes"
            className="mb-5"
            selectedValues={filters.sizes}
            onClickCheckBox={filters.setSizes}
            items={[
               { text: '20 sm', value: '20' },
               { text: '30 sm', value: '30' },
               { text: '40 sn', value: '40' },
            ]}
         />

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Price from & to:</p>
            <div className="flex gap-3 mb-5">
               <Input 
                  type="number" 
                  placeholder="0" 
                  min={0} max={500} 
                  value={String(filters.prices.priceFrom)} 
                  onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))} 
               />
               <Input 
                  type="number" 
                  min={100}
                  max={500} 
                  placeholder="500" 
                  value={String(filters.prices.priceTo)} 
                  onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))} 
               />
            </div>

            <RangeSlider 
               min={0} 
               max={500} 
               step={5} 
               value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 500]} 
               onValueChange={updatePrices} 
            />
         </div>

         <CheckboxFiltersGroup 
            title='Ingredients'
            name='ingredients'
            className='mt-5'
            limit={6}
            defaultItems={items.slice(0, 6)}
            items={items}
            loading={loading}
            onClickCheckBox={filters.setSelectedIngredients}
            selectedValues={filters.selectedIngredients}
         />
      </div>
   );
}