import { z } from "zod";

// ✅ Correct schema name is 'productSchema'
export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be 0 or more"),
  stock: z.number().min(0, "Stock must be 0 or more"),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().url("Image URL must be valid"),
  
});

// ✅ Correctly exported type
export type ProductFormData = z.infer<typeof productSchema>;
