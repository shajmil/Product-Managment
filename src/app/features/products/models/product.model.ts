export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCreateUpdate {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
} 