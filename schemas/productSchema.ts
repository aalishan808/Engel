import { z } from 'zod';

export const productSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    image: z.string().url('Image must be a valid URL'),
    status: z.enum(['In Stock', 'Out of Stock']),
    excerpt: z.string().max(300, 'Excerpt must be at most 50 words'), // ~6 chars/word
    isVisible: z.boolean(),
});

export type ProductSchema = z.infer<typeof productSchema>;
