import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";

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