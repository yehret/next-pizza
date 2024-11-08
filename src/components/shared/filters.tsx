'use client'

import React from 'react'
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from '../ui/range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngradients } from '../../../hooks/useFilterIngradients';

interface Props {
   className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingradients, loading } = useFilterIngradients()

   const items = ingradients.map((item) => ({ value: String(item.id), text: item.name }))

   return (
      <div className={className}>
         <Title text='Filter' size='sm' className='mb-5 font-bold'/>

         <div className="flex flex-col gap-4" >
            <FilterCheckbox text="Can be created" value="1"/>
            <FilterCheckbox text="New" value="2"/>
         </div>

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Price from & to:</p>
            <div className="flex gap-3 mb-5">
               <Input type="number" placeholder="0" min={0} max={500} defaultValue={0} />
               <Input type="number" min={100} max={500} placeholder="500" />
            </div>

            <RangeSlider min={0} max={500} step={10} value={[0, 500]} />
         </div>

         <CheckboxFiltersGroup 
            title='Ingredients'
            className='mt-5'
            limit={6}
            defaultItems={items.slice(0, 6)}
            items={items}
            loading={loading}
         />
      </div>
   );
}