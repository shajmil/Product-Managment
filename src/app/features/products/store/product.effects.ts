import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import * as ProductActions from './product.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as ProductSelectors from './product.selectors';


export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router)
  private store = inject(Store);


  
    loadProducts$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        switchMap((action) => {
          console.log('action: ', action);
          let page = action.page;
          console.log('page: ', page);
          let limit = action.limit;
          console.log('limit: ', limit);

        
          
          return this.productService.getProducts(page, limit).pipe(
            map(response => ProductActions.loadProductsSuccess({ 
              products: response.items,
              totalCount: response.total 
            })),
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
  createProductFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createProductFailure),
        tap((action) => {
          this.snackBar.open(`Failed to create product: ${action.error}`, 'Close', {
            duration: 3000,
            panelClass: 'error-snackbar'
          });
        })
      ),
    { dispatch: false }
  );

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      mergeMap((action) => this.productService.updateProduct(action.id, action.product).pipe(
        map(updatedProduct => ProductActions.updateProductSuccess({ product: updatedProduct })),
        catchError(error => of(ProductActions.updateProductFailure({ error: error.message })))
      ))
    );
  });
  createProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.createProductSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        }),
        map(() => ProductActions.loadProducts({ page: 1, limit: 10 }))
      )
  );
  
  updateProductSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.updateProductSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        }),
        map(() => ProductActions.loadProducts({ page: 1, limit: 10 }))
      )
  );
  deleteProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProductSuccess),
      switchMap(() => {
        let page = 1;
        let limit = 8;
        
        this.store.select(ProductSelectors.selectCurrentPage).subscribe(currentPage => {
          page = currentPage;
        }).unsubscribe();
        
        console.log('page: ', page);
        this.store.select(ProductSelectors.selectItemsPerPage).subscribe(itemsPerPage => {
          limit = itemsPerPage;
        }).unsubscribe();
        console.log('limit: ', limit);
        
        this.store.select(ProductSelectors.selectAllProducts).subscribe(products => {
          console.log('products: ', products);
          if (products.length == 0 && page > 1) {
            page = page - 1;
            this.store.dispatch(ProductActions.setPageConfig({ page, limit }));
          }
        }).unsubscribe();
        
        return of(ProductActions.loadProducts({ page, limit }));
      })
    );
  });


  loadProductsOnPageChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.setPageConfig), 
      withLatestFrom(
        this.store.pipe(select(ProductSelectors.selectCurrentPage)), 
        this.store.pipe(select(ProductSelectors.selectItemsPerPage)) 
      ),
      switchMap(([_, page, limit]) => {
        console.log('limit: ', limit);
        console.log('page: ', page);
  
        return this.productService.getProducts(page, limit).pipe(
          map(response => ProductActions.loadProductsSuccess({ 
            products: response.items,
            totalCount: response.total 
          })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        );
      })
    )
  );
  
deleteProduct$ = createEffect(() => 
  this.actions$.pipe(
    ofType(ProductActions.deleteProduct),
    switchMap(({ id }) => 
      this.productService.deleteProduct(id).pipe(
        map(() => ProductActions.deleteProductSuccess({ id })),
        catchError(error => of(ProductActions.deleteProductFailure({ error })))
      )
    )
  )
);
}