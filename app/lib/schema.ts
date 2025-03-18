import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Name is required!").max(100, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required!")
    .max(1000, "Description is too long"),
  price: z.coerce
    .number()
    .min(0, "Price must be positive")
    .refine((val) => val !== 0, {
      message: "Price is required!",
    }),
  discount: z.coerce
    .number()
    .min(0, "Discount must be positive")
    .max(100, "Discount cannot exceed 100%"),
  stockQuantity: z.coerce
    .number()
    .int()
    .min(0, "Stock quantity must be positive")
    .refine((val) => val !== 0, {
      message: "Stock quantity is required!",
    }),
  category: z.string().min(1, "Category is required!"),
  color: z.array(z.string()),
  size: z.array(z.string()),
  mainImage: z.string().min(1, "Main image is required!"),
  additionalImages: z.array(z.string()),
});

export type ProductFormValues = z.infer<typeof productSchema>;
