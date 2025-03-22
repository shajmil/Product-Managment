import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Product } from '../../models/product.model';
import * as ProductSelectors from '../../store/product.selectors';
import * as ProductActions from '../../store/product.actions';
import { DeleteConfirmationComponent } from '../../components/delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { sharedModule } from '../../../../shared/shared.module';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    sharedModule
  ],
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);


  products$ = this.store.select(ProductSelectors.selectAllProducts);
  loading$ = this.store.select(ProductSelectors.selectProductLoading);
  currentPage$ = this.store.select(ProductSelectors.selectCurrentPage);
  itemsPerPage$ = this.store.select(ProductSelectors.selectItemsPerPage);
  totalProducts$ = this.store.select(ProductSelectors.selectTotalCount );
  
  
  ngOnInit(): void {
    this.loadProducts();

  }

  loadProducts(): void {
      let page = 1;
        let limit = 8;
        
        this.store.select(ProductSelectors.selectCurrentPage).subscribe(currentPage => {
          page = currentPage;
        }).unsubscribe();
      
        
        console.log('page: ', page);
        this.store.select(ProductSelectors.selectItemsPerPage).subscribe(itemsPerPage => {
          limit = itemsPerPage;
        }).unsubscribe();
    this.store.dispatch(ProductActions.loadProducts({page,limit}));
   
  }
  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    
    this.store.dispatch(ProductActions.setPageConfig({ page, limit }));
  }
  
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = '/assets/images/img_error.webp';
        imgElement.onerror = null;
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