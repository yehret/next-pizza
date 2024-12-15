import { z } from 'zod';

export const passwordSchema = z.string().min(3, { message: "Password must be at least 3 symbols"})

export const formLoginSchema = z.object({
   email: z.string().email({ message: "Enter correct email" }),
   password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
   .merge(
      z.object({
         fullName: z.string().min(3, { message: "Please enter your full name" }),
         confirmPassword: passwordSchema,
      }),
   )
   .refine((data) => data.password === data.confirmPassword, {
      message: "Password doesn't match",
      path: ['confirmPassword']
   })

export type TFormLoginValues = z.infer<typeof formLoginSchema>
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>