import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import * as ProductActions from '../../store/product.actions';
import * as ProductSelectors from '../../store/product.selectors';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDividerModule,
    AsyncPipe
  ],
  template: `
    <div class="container mx-auto p-4">
      <div class="mb-4">
        <a [routerLink]="['/products']" class="text-blue-600 hover:text-blue-800 flex items-center">
          <mat-icon class="mr-1">arrow_back</mat-icon>
          Back to Products
        </a>
      </div>

      @if (loading$ | async) {
        <div class="flex justify-center my-8">
          <mat-spinner diameter="40"></mat-spinner>
        </div>
      } @else {
        @if (product$ | async; as product) {
          <mat-card class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="md:flex">
              <div class="md:w-1/3">
                <img [src]="product.imageUrl" [alt]="product.name" class="w-full h-64 object-cover object-center">
              </div>
              <div class="md:w-2/3 p-6">
                <div class="flex justify-between items-start">
                  <div>
                    <h1 class="text-2xl font-semibold text-gray-800 mb-2">{{product.name}}</h1>
                    <p class="inline-block px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800 mb-4">
                      {{product.category}}
                    </p>
                  </div>
                  <div class="text-2xl font-bold text-indigo-600">
                    {{product.price | currency}}
                  </div>
                </div>
                
                <mat-divider class="my-4"></mat-divider>
                
                <div class="mb-4">
                  <h2 class="text-lg font-medium text-gray-800 mb-2">Description</h2>
                  <p class="text-gray-600">{{product.description}}</p>
                </div>
                
                <div class="mb-4">
                  <h2 class="text-lg font-medium text-gray-800 mb-2">Stock Information</h2>
                  <p class="text-gray-600">
                    <span class="font-medium">Available: </span>
                    <span [ngClass]="product.quantity > 0 ? 'text-green-600' : 'text-red-600'">
                      {{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}}
                    </span>
                    <span class="ml-2">({{product.quantity}} units)</span>
                  </p>
                </div>
                
                <mat-divider class="my-4"></mat-divider>
                
                <div class="mt-6 flex space-x-3">
                  <a [routerLink]="['/products/edit', product.id]" 
                     class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                    <mat-icon class="mr-1">edit</mat-icon>
                    Edit Product
                  </a>
                  <button (click)="openDeleteDialog(product.id)" 
                     class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center">
                    <mat-icon class="mr-1">delete</mat-icon>
                    Delete Product
                  </button>
                </div>
              </div>
            </div>
          </mat-card>
        } @else {
          <div class="bg-white p-8 rounded-lg shadow-md text-center">
            <p class="text-gray-600 mb-4">Product not found</p>
            <a [routerLink]="['/products']" 
               class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Back to Products
            </a>
          </div>
        }
      }
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  private store = inject(Store);
  
  loading$ = this.store.select(ProductSelectors.selectProductLoading);
  product$ = this.store.select(ProductSelectors.selectSelectedProduct);
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.store.dispatch(ProductActions.loadProduct({ id }));
    }
  }

  openDeleteDialog(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
      // Navigate back to the product list after deletion
      // Will be handled by the effect
    }
  }
} 