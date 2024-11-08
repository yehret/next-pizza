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

interface PriceProps {
   priceFrom: number;
   priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingradients, loading, onAddId, selectedIds } = useFilterIngradients()
   const [prices, setPrice] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 500 })

   const updatePrice = (name: keyof PriceProps, value: number) => {
      setPrice({...prices, [name]: value})
   }

   const items = ingradients.map((item) => ({ value: String(item.id), text: item.name }))

   return (
      <div className={className}>
         <Title text='Filter' size='sm' className='mb-5 font-bold'/>

         <div className="flex flex-col gap-4" >
            <FilterCheckbox name='qwe' text="Can be created" value="1"/>
            <FilterCheckbox name='qwe' text="New" value="2"/>
         </div>

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Price from & to:</p>
            <div className="flex gap-3 mb-5">
               <Input type="number" placeholder="0" min={0} max={500} value={String(prices.priceFrom)} onChange={(e) => updatePrice('priceFrom', Number(e.target.value))} />
               <Input type="number" min={100} max={500} placeholder="500" value={String(prices.priceTo)} onChange={(e) => updatePrice('priceTo', Number(e.target.value))} />
            </div>

            <RangeSlider min={0} max={500} step={5} value={[prices.priceFrom, prices.priceTo]} onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })} />
         </div>

         <CheckboxFiltersGroup 
            title='Ingredients'
            name='ingradients'
            className='mt-5'
            limit={6}
            defaultItems={items.slice(0, 6)}
            items={items}
            loading={loading}
            onClickCheckBox={onAddId}
            selectedIds={selectedIds}
         />
      </div>
   );
}