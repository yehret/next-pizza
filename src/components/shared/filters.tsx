'use client'

import React from 'react'
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from '../ui/range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngradients } from '../../../hooks/useFilterIngradients';
import { useSet } from 'react-use';

interface Props {
   className?: string
}

interface PriceProps {
   priceFrom: number;
   priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingradients, loading, onAddId, selectedIngradients } = useFilterIngradients()
   const [prices, setPrice] = React.useState<PriceProps>({ priceFrom: 0, priceTo: 500 })

   const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
   const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>([]));

   const items = ingradients.map((item) => ({ value: String(item.id), text: item.name }))

   const updatePrice = (name: keyof PriceProps, value: number) => {
      setPrice({...prices, [name]: value})
   }

   React.useEffect(() => {
      console.log({prices, pizzaTypes, sizes, selectedIngradients});
   }, [prices, pizzaTypes, sizes, selectedIngradients])

   return (
      <div className={className}>
         <Title text='Filter' size='sm' className='mb-5 font-bold'/>

         <CheckboxFiltersGroup
            title="Dough type"
            name="pizzaTypes"
            className="mb-5"
            selectedValues={pizzaTypes}
            onClickCheckBox={togglePizzaTypes}
            items={[
               { text: 'Thin', value: '1' },
               { text: 'Traditional', value: '2' },
            ]}
            />

         <CheckboxFiltersGroup
            title="Sizes"
            name="sizes"
            className="mb-5"
            selectedValues={sizes}
            onClickCheckBox={toggleSizes}
            items={[
               { text: '20 sm', value: '20' },
               { text: '30 sm', value: '30' },
               { text: '40 sn', value: '40' },
            ]}
         />

         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Price from & to:</p>
            <div className="flex gap-3 mb-5">
               <Input type="number" placeholder="0" min={0} max={500} value={String(prices.priceFrom)} onChange={(e) => updatePrice('priceFrom', Number(e.target.value))} />
               <Input type="number" min={100} max={500} placeholder="500" value={String(prices.priceTo)} onChange={(e) => updatePrice('priceTo', Number(e.target.value))} />
            </div>

            <RangeSlider min={0} max={500} step={5} value={[prices.priceFrom || 0, prices.priceTo || 500]} onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })} />
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
            selectedValues={selectedIngradients}
         />
      </div>
   );
}