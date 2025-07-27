export type ProductStatus = 'In Stock' | 'Out of Stock' | 'Limited';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: ProductStatus;
  excerpt: string;
  isVisible: boolean;
  stock: number;
  category: string;
}

export interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  image: string | File;
  status: ProductStatus;
  excerpt: string;
  isVisible: boolean;
  stock: number;
  category: string;
}