import { PayloadAction, SerializedError, createSlice } from "@reduxjs/toolkit";
import { CartType, ProductState } from "../components/shopping/interface";

const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: null,
    cart: []
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProductFetch: (state) => {
            state.isLoading = true;
        },
        getProductSuccess: (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        },
        getProductError: (state) => {
            state.isLoading = false;
            state.error = new Error();
        },
        
        onCart: (state, action: PayloadAction<{ newProduct: CartType }>) => {
            const existingItem = state.cart.find(
                (p) => p.product.id === action.payload.newProduct.product.id
            );

            if (existingItem) {
                existingItem.quantity += action.payload.newProduct.quantity;
            } else {
                state.cart.push(action.payload.newProduct);
            }
        },

        setCartAfterPurchase: (state) => {
            state.cart = []
        },

        onDecrement: (state, action) => {
            state.cart = action.payload         
        },

        onIncrement: (state, action) => {
            state.cart = action.payload
        },
        onDeleteCartItem: (state, action) => {
            state.cart = action.payload         
        }
    }
})

export const {
    getProductFetch,
    getProductSuccess,
    getProductError,
    onCart,
    setCartAfterPurchase,
    onDecrement,
    onIncrement,
    onDeleteCartItem
} = productSlice.actions;

export default productSlice.reducer;