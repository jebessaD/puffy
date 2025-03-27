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
  color: z.array(z.string()),
  size: z.array(z.string()),
  mainImage: z.string().min(1, "Main image is required!").url("Invalid URL"),
  additionalImages: z.array(z.string()),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export const shippingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(5, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state:  z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  postalCode: z.string().min(1, "Postal code is required"),
});

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;

