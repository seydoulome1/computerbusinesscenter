
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'supervisor' | 'seller';
  name: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  alertThreshold: number;
  imageUrl: string;
}

export interface Sale {
  id: string;
  sellerId: string;
  date: Date;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: 'cash' | 'mobile_money' | 'credit';
  total: number;
  client?: Client;
  dueDate?: Date;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  email?: string;
  address?: string;
  dueDate?: Date;
}
