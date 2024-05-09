export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  dublicatedProducts?: number;
  userId: string;
  factoryId: string;
}

export interface Factory {
  id: string;
  name: string;
}
export interface ProductFactory {
  productId: string;
  factoryId: string;
}
