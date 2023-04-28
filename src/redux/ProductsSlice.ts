import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  newItem?: any;
}

interface ProductState {
  isLoading: boolean;
  error: SerializedError | null;
  products: Product[];
  currentProduct: Product[];
  cartItems: CartItem[];
  quantity: number;
  purchased: boolean;
}

const initialState: ProductState = {
  isLoading: false,
  error: null,
  products: [],
  currentProduct: [],
  cartItems: [],
  quantity: 0,
  purchased: false,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<Product[]>(
      "https://fakestoreapi.com/products"
    );
    return response.data;
  }
);

const productsSlices = createSlice({
  name: "products",
  initialState,
  reducers: {
    onShowDetailProduct: (
      state,
      action: PayloadAction<{ product: Product }>
    ) => {
      state.currentProduct = [action.payload.product];
    },

    onSendToCart: (state, action: PayloadAction<{ newItem: CartItem }>) => {
      if(state.quantity > 0 ){

        const existingItem = state.cartItems.find(
          (item) => item.product.id === action.payload.newItem.product.id
        );
  
        if (existingItem) {
          existingItem.quantity += action.payload.newItem.quantity;
        } else {
          state.cartItems.push(action.payload.newItem);
        }
      } else {
        alert(' Please select product quantity')

      }
    },

    onDecrementQuantity: (state, action) => {
      state.quantity = action.payload.quantity - 1;
    },
    onIncrementQuantity: (state, action) => {
      state.quantity = action.payload.quantity + 1;
    },

    onDecrementProductCheckout: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (index !== -1) {
        state.cartItems[index].quantity -= 1;
      }
    },

    onIncrementProductCheckout: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (index !== -1) {
        state.cartItems[index].quantity += 1;
      }
    },
    
    onDeleteProduct: (state, action: PayloadAction<{ id: number }>) => {
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item.product.id !== action.payload.id
      );
    },
    onPurchase:(state) => {
   state.cartItems = []
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});
export const {
  onShowDetailProduct,
  onSendToCart,
  onDecrementProductCheckout,
  onIncrementProductCheckout,
  onDecrementQuantity,
  onIncrementQuantity,
  onDeleteProduct,
  onPurchase,
} = productsSlices.actions;

export default productsSlices.reducer;
