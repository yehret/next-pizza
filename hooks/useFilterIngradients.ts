import { Ingradient } from "@prisma/client"
import React from "react"
import { Api } from "../services/api-client"

interface ReturnProps {
   ingradients: Ingradient[]
   loading: boolean
}

export const useFilterIngradients = (): ReturnProps => {
   const [ingradients, setIngradients] = React.useState<Ingradient[]>([])
   const [loading, setLoading] = React.useState(true)

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

   return { ingradients, loading }
}
