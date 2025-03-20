 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common'; 



import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="p-6">  
      <h2 class="text-xl font-bold mb-4">Confirm Delete</h2>
      <p class="mb-6">Are you sure you want to delete the product <span class="font-semibold">{{ data.product.name }}</span>?</p>
      <p class="text-sm text-red-600 mb-6">This action cannot be undone.</p>
      
      <div class="flex justify-end gap-4">
        <button mat-stroked-button (click)="onNoClick()">Cancel</button>
        <button mat-raised-button color="warn" (click)="onYesClick()">Delete</button>
      </div>
    </div>
  `
})
export class DeleteConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}