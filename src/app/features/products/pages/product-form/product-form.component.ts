import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as ProductActions from '../../store/product.actions';
import * as ProductSelectors from '../../store/product.selectors';
import { ProductCreateUpdate } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <div class="mb-4">
        <a [routerLink]="['/products']" class="text-blue-600 hover:text-blue-800 flex items-center">
          <mat-icon class="mr-1">arrow_back</mat-icon>
          Back to Products
        </a>
      </div>

      <mat-card class="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6">{{ isEditMode ? 'Edit' : 'Create' }} Product</h1>

        @if (loading$ | async) {
          <div class="flex justify-center my-8">
            <mat-spinner diameter="40"></mat-spinner>
          </div>
        } @else {
          <form [formGroup]="productForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Product Name</mat-label>
              <input matInput formControlName="name" placeholder="Enter product name">
              
              @if (productForm.get('name')?.invalid && productForm.get('name')?.touched) {
                <mat-error>
                  Name is required
                </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="4" placeholder="Enter product description"></textarea>
              
              @if (productForm.get('description')?.invalid && productForm.get('description')?.touched) {
                <mat-error>
                  Description is required
                </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Price</mat-label>
              <input matInput type="number" formControlName="price" placeholder="Enter product price">
              <span matPrefix>$&nbsp;</span>
              
              @if (productForm.get('price')?.invalid && productForm.get('price')?.touched) {
                <mat-error>
                  @if (productForm.get('price')?.errors?.['required']) {
                    Price is required
                  } @else if (productForm.get('price')?.errors?.['min']) {
                    Price must be greater than 0
                  }
                </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Image URL</mat-label>
              <input matInput formControlName="imageUrl" placeholder="Enter image URL">
              
              @if (productForm.get('imageUrl')?.invalid && productForm.get('imageUrl')?.touched) {
                <mat-error>
                  Image URL is required
                </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Quantity</mat-label>
              <input matInput type="number" formControlName="quantity" placeholder="Enter product quantity">
              
              @if (productForm.get('quantity')?.invalid && productForm.get('quantity')?.touched) {
                <mat-error>
                  @if (productForm.get('quantity')?.errors?.['required']) {
                    Quantity is required
                  } @else if (productForm.get('quantity')?.errors?.['min']) {
                    Quantity cannot be negative
                  }
                </mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Category</mat-label>
              <mat-select formControlName="category">
                <mat-option value="Electronics">Electronics</mat-option>
                <mat-option value="Clothing">Clothing</mat-option>
                <mat-option value="Books">Books</mat-option>
                <mat-option value="Home & Kitchen">Home & Kitchen</mat-option>
                <mat-option value="Toys & Games">Toys & Games</mat-option>
              </mat-select>
              
              @if (productForm.get('category')?.invalid && productForm.get('category')?.touched) {
                <mat-error>
                  Category is required
                </mat-error>
              }
            </mat-form-field>

            <div class="flex justify-end space-x-3 pt-4">
              <a [routerLink]="['/products']" mat-button color="warn">
                Cancel
              </a>
              <button type="submit" mat-raised-button color="primary" [disabled]="productForm.invalid">
                {{ isEditMode ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        }
      </mat-card>
    </div>
  `
})
export class ProductFormComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  
  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;
  loading$ = this.store.select(ProductSelectors.selectProductLoading);
  product$ = this.store.select(ProductSelectors.selectSelectedProduct);

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productId = +id;
      this.store.dispatch(ProductActions.loadProduct({ id: this.productId }));
      
      this.product$.subscribe(product => {
        if (product) {
          this.productForm.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: product.quantity,
            category: product.category
          });
        }
      });
    }
    this.store.select(ProductSelectors.selectSelectedProduct).subscribe(products => {
      console.log('Current products:', products);
    });
    this.store.select(ProductSelectors.selectAllProducts).subscribe(products => {
      console.log('Current products:', products);
    });
  }

  initForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      imageUrl: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log('this.productForm: ', this.productForm);
    if (this.productForm.invalid) {
      Object.keys(this.productForm.controls).forEach(key => {
        const control = this.productForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    const product: ProductCreateUpdate = this.productForm.value;
    console.log('product: ', product);

    if (this.isEditMode && this.productId) {
      this.store.dispatch(ProductActions.updateProduct({ 
        id: this.productId, 
        product 
      }));
    } else {
      this.store.dispatch(ProductActions.createProduct({ product }));
    }
  
    // Navigation will be handled by the effect after success
  }
} 