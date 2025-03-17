
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

export let globalProducts: Product[] = [];
