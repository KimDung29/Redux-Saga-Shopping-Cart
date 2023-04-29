import {
  createSlice,
  createAsyncThunk,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./apiCall";

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
    return response.data.slice(0,8); // only get 8 items for this example
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
      // make sure that user selected the quantity
      if(state.quantity > 0 ){
        // find item in cartItems to make sure there is no repeat item in cart
        const existingItem = state.cartItems.find(
          (item) => item.product.id === action.payload.newItem.product.id
        );
  
        if (existingItem) {
          existingItem.quantity += action.payload.newItem.quantity;
        } else {
          state.cartItems.push(action.payload.newItem);
        }
      } else {
        // if the user forgot select quantity and click on ' Add to cart' button => show this message
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
      // finding in cartItems the item has the same id with the id in list items on 'checkout' page
      const index = state.cartItems.findIndex(
        (item) => item.product.id === action.payload.id
      );

      if (index !== -1) {
        // in that index position => decrease the quantity
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
      // take all items without the item with id in payload
      state.cartItems = state.cartItems.filter(
        (item: CartItem) => item.product.id !== action.payload.id
      );
    },
    onPurchase:(state) => {
      // after checkout already, make the cartItems empty 
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
