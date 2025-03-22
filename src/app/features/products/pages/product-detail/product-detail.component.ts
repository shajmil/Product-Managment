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
import { sharedModule } from '../../../../shared/shared.module';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    sharedModule,
    AsyncPipe
  ],
  templateUrl:'product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  
  loading$ = this.store.select(ProductSelectors.selectProductLoading);
  product$ = this.store.select(ProductSelectors.selectSelectedProduct);
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = (this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.store.dispatch(ProductActions.loadProduct({ id }));
    }
  }

  openDeleteDialog(product: Product): void {
    console.log('product: ', product);
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: { product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(ProductActions.deleteProduct({ id: product.id }));
      }
    });
  }
}