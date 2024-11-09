'use client'

import React from 'react'
import { Title } from './title';
import { Input } from '../ui';
import { RangeSlider } from '../ui/range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';
import { useFilterIngradients } from '../../../hooks/useFilterIngradients';
import { useSet } from 'react-use';
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
   className?: string
}

interface PriceProps {
   priceFrom?: number;
   priceTo?: number;
}

interface QueryFilters extends PriceProps {
   pizzaTypes: string;
   sizes: string;
   ingradients: string;
}


export const Filters: React.FC<Props> = ({ className }) => {
   const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

   const router = useRouter()

   const { ingradients, loading, onAddId, selectedIngradients } = useFilterIngradients(searchParams.get('ingradients')?.split(','));
   const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []));
   const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []));
   const [prices, setPrice] = React.useState<PriceProps>({ 
      priceFrom: Number(searchParams.get('priceFrom')) || undefined,
      priceTo: Number(searchParams.get('priceTo')) || undefined
    })

   const items = ingradients.map((item) => ({ value: String(item.id), text: item.name }))

   const updatePrice = (name: keyof PriceProps, value: number) => {
      setPrice({...prices, [name]: value})
   }
   React.useEffect(() => {
      const filters = {
         ...prices,
         pizzaTypes: Array.from(pizzaTypes),
         sizes: Array.from(sizes),
         ingradients: Array.from(selectedIngradients),
      }

      const query = qs.stringify(filters, { arrayFormat: 'comma' })

      router.push(`?${query}`, { scroll: false })
   }, [prices, pizzaTypes, sizes, selectedIngradients, router])

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