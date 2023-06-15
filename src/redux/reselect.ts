import { createSelector } from 'reselect';
import { RootState } from './reducer';

const selectProductState = (state: RootState) => state.products;

export const selectProducts = createSelector(
  selectProductState,
  productState => productState.products
);

export const selectCart = createSelector(
  selectProductState,
  productState => productState.cart
);

export const selectIsLoading = createSelector(
  selectProductState,
  productState => productState.isLoading
);

export const selectError = createSelector(
  selectProductState,
  productState => productState.error
);
