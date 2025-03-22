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
import { sharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    sharedModule
  ],
  templateUrl:'product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  
  productForm!: FormGroup;
  isEditMode = false;
  productId?: string;
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
      this.productId = id;
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

    if (this.isEditMode && this.productId) {
      this.store.dispatch(ProductActions.updateProduct({ 
        id: this.productId, 
        product 
      }));
    } else {
      this.store.dispatch(ProductActions.createProduct({ product }));
    }
  }
}