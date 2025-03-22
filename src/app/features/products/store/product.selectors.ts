import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, selectAll } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  selectAll
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state: ProductState) => state.page
);

export const selectItemsPerPage = createSelector(
  selectProductState,
  (state: ProductState) => state.itemsPerPage
);

export const selectSelectedProductId = createSelector(
  selectProductState,
  (state: ProductState) => state.selectedProductId
);

export const selectSelectedProduct = createSelector(
  selectProductState,
  selectSelectedProductId,
  (state, selectedId) => {
    if (selectedId === null) return null;
    return state.entities[selectedId];
  }
); 

export const selectTotalCount = createSelector(
  selectProductState,
  (state: ProductState) => state.totalCount || 0
);

export const selectTotalProducts = createSelector(
  selectAllProducts,
  (products) => products.length
);
