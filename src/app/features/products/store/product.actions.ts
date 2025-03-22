import { createAction, props } from '@ngrx/store';
import { Product, ProductCreateUpdate } from '../models/product.model';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{ page?: number; limit?: number }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[], totalCount?: number }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const loadProduct = createAction(
  '[Product] Load Product',
  props<{ id: string }>()
);

export const loadProductSuccess = createAction(
  '[Product] Load Product Success',
  props<{ product: Product }>()
);

export const loadProductFailure = createAction(
  '[Product] Load Product Failure',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ product: ProductCreateUpdate }>()
);

export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product] Create Product Failure',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Product] Update Product',
  props<{ id: string; product: ProductCreateUpdate }>()
);

export const updateProductSuccess = createAction(
  '[Product] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product] Update Product Failure',
  props<{ error: string }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: string }>()
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: string }>()
);

export const deleteProductFailure = createAction(
  '[Product] Delete Product Failure',
  props<{ error: string }>()
);

export const setSelectedProduct = createAction(
  '[Product] Set Selected Product',
  props<{ id: string }>()
);

export const clearSelectedProduct = createAction(
  '[Product] Clear Selected Product'
);

export const setPageConfig = createAction(
  '[Product] Set Page Config',
  props<{ page: number; limit: number }>()
);