import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

/**
 * Function to calculate the total price of a pizza
 * @param type - type of dough of choosen pizza
 * @param size - size of choosen pizza
 * @param items - list of variants
 * @param ingredients - list of ingredients
 * @param selectedIngredients - selected ingredients
 * @returns number of total price
 */
export const calcTotalPizzaPrice = (
   type: PizzaType, 
   size: PizzaSize, 
   items: ProductItem[], 
   ingredients: Ingredient[],
   selectedIngredients: Set<number>,
) => {
   const pizzaPrice = items.find((item) => item.pizzaType === type && item.size === size)?.price || 0;
   const ingredientsPrice = ingredients
      .filter((ingredient) => selectedIngredients.has(ingredient.id))
      .reduce((acc, ingredient) => acc + ingredient.price, 0);

   return pizzaPrice + ingredientsPrice;
}