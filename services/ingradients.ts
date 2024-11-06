import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"
import { Ingradient } from "@prisma/client"

export const getAll = async (): Promise<Ingradient[]> => {
   return (await axiosInstance.get<Ingradient[]>(ApiRoutes.GET_INGRADIENTS)).data
}