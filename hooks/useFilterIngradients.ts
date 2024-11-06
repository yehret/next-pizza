import { Ingradient } from "@prisma/client"
import React from "react"
import { Api } from "../services/api-client"

interface ReturnProps {
   ingradients: Ingradient[]
}

export const useFilterIngradients = (): ReturnProps => {
   const [ingradients, setIngradients] = React.useState<Ingradient[]>([])

   React.useEffect(() => {
      async function getIngradients() {
         try {
            const ingradients = await Api.ingradients.getAll();
            setIngradients(ingradients)
         } catch (error) {
            console.log(error);
         }
      }

      getIngradients();
   }, [])

   return { ingradients }
}
