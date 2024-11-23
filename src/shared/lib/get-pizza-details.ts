import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  items: ProductItem[],
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const textDetails = `${size}sm, ${mapPizzaType[type]} pizza`;
  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);

  return { textDetails, totalPrice };
};
