import { SerializedError } from "@reduxjs/toolkit";

export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: { 
      rate: number,
      count: number,
    }
}
export interface CartType {
    product: ProductType;
    quantity: number
}
export interface ProductState {
    products: ProductType[];
    isLoading: boolean;
    error: null | SerializedError;
    cart: CartType[]
}