import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';

import { Product } from '../../models/product.model';
import * as ProductSelectors from '../../store/product.selectors';
import * as ProductActions from '../../store/product.actions';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AsyncPipe
  ],
  template: `
    <div class="container mx-auto p-4">
      <div class="flex justify-between items-center mb-6"> 
        <h1 class="text-2xl font-semibold text-gray-800">Products</h1>
        <a [routerLink]="['/products/create']" 
           class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md 
                  flex items-center">
          <mat-icon class="mr-1">add</mat-icon>
          Add Product
        </a>
      </div>

      @if (loading$ | async) {
        <div class="flex justify-center my-8">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {
        @if ((products$ | async)?.length) {
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50">
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (product of products$ | async; track product.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-4 py-3 border-t">{{product.id}}</td>
                    <td class="px-4 py-3 border-t">
                      <img [src]="product.imageUrl" [alt]="product.name" class="h-12 w-12 object-cover rounded">
                    </td>
                    <td class="px-4 py-3 border-t">{{product.name}}</td>
                    <td class="px-4 py-3 border-t">
                      <span class="font-semibold text-blue-600">{{product.price | currency}}</span>
                    </td>
                    <td class="px-4 py-3 border-t">
                      <span class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {{product.category}}
                      </span>
                    </td>
                    <td class="px-4 py-3 border-t">
                      <div class="flex space-x-2">
                        <a [routerLink]="['/products', product.id]" 
                           class="text-indigo-600 hover:text-indigo-900">
                          <mat-icon>visibility</mat-icon>
                        </a>
                        <a [routerLink]="['/products/edit', product.id]" 
                           class="text-yellow-600 hover:text-yellow-900">
                          <mat-icon>edit</mat-icon>
                        </a>
                        <button (click)="openDeleteDialog(product.id)" 
                           class="text-red-600 hover:text-red-900">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </td>
                  </tr>
                }
              </tbody>
            </table>

            <mat-paginator 
              [length]="100"
              [pageSize]="10" 
              [pageSizeOptions]="[5, 10, 25, 100]"
              (page)="onPageChange($event)"
              class="border-t">
            </mat-paginator>
          </div>
        } @else {
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <p class="text-gray-600 mb-4">No products found</p>
            <a [routerLink]="['/products/create']" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Add Your First Product
            </a>
          </div>
        }
      }
    </div>
  `
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);
  
  products$ = this.store.select(ProductSelectors.selectAllProducts);
  loading$ = this.store.select(ProductSelectors.selectProductLoading);
  
  ngOnInit(): void {
    this.loadProducts(1, 10);
  }

  loadProducts(page: number, limit: number): void {
    this.store.dispatch(ProductActions.loadProducts({ page, limit }));
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.loadProducts(page, limit);
  }

  openDeleteDialog(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
    }
  }
} 