import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  stock: z.number().min(0, "Stock must be 0 or greater"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Invalid image URL"),
});

export type ProductFormData = z.infer<typeof ProductSchema>;
