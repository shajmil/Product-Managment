import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Product } from '../models/product.model';
import * as ProductActions from './product.actions';

export interface ProductState extends EntityState<Product> {
  selectedProductId: number | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  selectedProductId: null,
  loading: false,
  error: null,
  currentPage: 1,
  itemsPerPage: 10
});

export const productReducer = createReducer(
  initialState,
  
  // Load Products
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) => 
    adapter.setAll(products, { ...state, loading: false })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Load Single Product
  on(ProductActions.loadProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductSuccess, (state, { product }) => 
    adapter.upsertOne(product, { 
      ...state, 
      selectedProductId: product.id || null,
      loading: false 
    })
  ),
  on(ProductActions.loadProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Create Product
  on(ProductActions.createProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.createProductSuccess, (state, { product }) => 
    adapter.addOne(product, { ...state, loading: false })
  ),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Update Product
  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.updateProductSuccess, (state, { product }) => 
    adapter.updateOne(
      { id: product.id!, changes: product },
      { ...state, loading: false }
    )
  ),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  // Delete Product
  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => 
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors(); 