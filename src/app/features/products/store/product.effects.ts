import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as ProductActions from './product.actions';

export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap((action) => {
        const page = action.page ?? 1;
        const limit = action.limit ?? 10;
        
        return this.productService.getProducts(page, limit).pipe(
          map(products => ProductActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductActions.loadProductsFailure({ error: error.message })))
        );
      })
    );
  });

  loadProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap((action) => this.productService.getProductById(action.id).pipe(
        map(product => ProductActions.loadProductSuccess({ product })),
        catchError(error => of(ProductActions.loadProductFailure({ error: error.message })))
      ))
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap((action) => this.productService.createProduct(action.product).pipe(
        map(newProduct => ProductActions.createProductSuccess({ product: newProduct })),
        catchError(error => of(ProductActions.createProductFailure({ error: error.message })))
      ))
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) => this.productService.updateProduct(action.id, action.product).pipe(
        map(updatedProduct => ProductActions.updateProductSuccess({ product: updatedProduct })),
        catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
      ))
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap((action) => this.productService.deleteProduct(action.id).pipe(
        map(() => ProductActions.deleteProductSuccess({ id: action.id })),
        catchError(error => of(ProductActions.deleteProductFailure({ error: error.message })))
      ))
    );
  });
}