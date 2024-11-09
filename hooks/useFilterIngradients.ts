import { Ingradient } from "@prisma/client"
import React from "react"
import { Api } from "../services/api-client"
import { useSet } from "react-use"

interface ReturnProps {
   ingradients: Ingradient[]
   loading: boolean;
   selectedIngradients: Set<string>;
   onAddId: (id: string) => void;
}

export const useFilterIngradients = (values: string[] = []): ReturnProps => {
   const [ingradients, setIngradients] = React.useState<Ingradient[]>([])
   const [loading, setLoading] = React.useState(true)

   const [selectedIds, { toggle }] = useSet(new Set<string>(values));

   React.useEffect(() => {
      async function getIngradients() {
         try {
            setLoading(true)
            const ingradients = await Api.ingradients.getAll();
            setIngradients(ingradients)
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false)
         }
      }

      getIngradients();
   }, [])


   return { ingradients, loading, onAddId: toggle, selectedIngradients: selectedIds}
}
