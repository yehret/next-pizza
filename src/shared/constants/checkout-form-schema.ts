import { z } from "zod";

export const checkoutFormSchema = z.object({
   firstName: z.string().min(3, "First name must be at least 3 characters"),
   lastName: z.string().min(3, "Last name must be at least 3 characters"),
   email: z.string().email("Invalid email address"),
   phone: z.string().min(9, "Invalid phone number"),
   address: z.string().min(5, "Invalid address"),
   comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;