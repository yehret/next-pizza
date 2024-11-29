import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import { useRouter } from "next/navigation";

export const useQueryFilters = (filters: Filters) => {
   const router = useRouter();
   const prevQueryRef = React.useRef("");

   React.useEffect(() => {
      const params = {
         ...filters.prices,
         pizzaTypes: Array.from(filters.pizzaTypes),
         sizes: Array.from(filters.sizes),
         ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, { arrayFormat: 'comma' });

      // Only update URL if the query string has changed
      if (query !== prevQueryRef.current) {
         prevQueryRef.current = query;
         router.push(`?${query}`, { scroll: false });
      }
   }, [
      filters
   ]);
};
