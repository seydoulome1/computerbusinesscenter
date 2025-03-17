
import { ReactElement } from "react";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  alertThreshold: number;
  image: string;
  icon?: ReactElement;
}

export type ProductFormData = Omit<Product, "id" | "icon">;

// Export a reference to the products array that can be used across different files
export let globalProducts: Product[] = [];
