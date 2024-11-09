import { Api } from "../services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

export const useIngredients = () => {
   const [ingredients, setIngredients] = React.useState<Ingredient[]>([])
   const [loading, setLoading] = React.useState(true)

   React.useEffect(() => {
      async function getIngredients() {
         try {
            setLoading(true)
            const ingredients = await Api.ingredients.getAll();
            setIngredients(ingredients)
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false)
         }
      }

      getIngredients();
   }, [])

   return { 
      ingredients, 
      loading
   }
}