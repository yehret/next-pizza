import { Variant } from '@/shared/components/shared/group-variants'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import React from 'react'
import { useSet } from 'react-use'
import { getAvailablePizzaSizes } from '../lib/get-available-pizza-sizes'
import { ProductItem } from '@prisma/client'

interface ReturnProps {
   size: PizzaSize,
   type: PizzaType,
   selectedIngredients: Set<number>,
   availableSizes: Variant[],
   setSize: (size: PizzaSize) => void,
   setType: (type: PizzaType) => void,
   addIngredient: (id: number) => void,
   currentItemId?: number;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
   const [size, setSize] = React.useState<PizzaSize>(20)
   const [type, setType] = React.useState<PizzaType>(1)
   const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

   const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id

   const availableSizes = getAvailablePizzaSizes(type, items)

   React.useEffect(() => {
      const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled)
      const availableSize = availableSizes?.find((item) => !item.disabled)

      if(!isAvailableSize && availableSize) {
         setSize(Number(availableSize.value) as PizzaSize)
      }
   }, [type])

   return {
      size,
      type,
      setSize,
      selectedIngredients,
      setType,
      addIngredient,
      availableSizes,
      currentItemId
   }
}