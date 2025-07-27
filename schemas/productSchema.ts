import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  imageUrl: z.union([
    z.string().url("Invalid image URL"),
    z.instanceof(File).refine(file => file.size <= 1000000, "File size must be less than 1MB")
  ]),
  status: z.enum(["In Stock", "Out of Stock", "Limited"]),
  excerpt: z.string().max(200, "Excerpt must be 50 words or less"),
  isVisible: z.boolean()
});

export type ProductFormData = z.infer<typeof productSchema>;