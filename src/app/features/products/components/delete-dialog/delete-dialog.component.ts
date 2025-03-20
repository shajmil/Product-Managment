import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Delete Product</h2>
      <p class="text-gray-600 mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
      
      <div class="flex justify-end space-x-3">
        <button mat-button (click)="onCancel()">
          Cancel
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()">
          Delete
        </button>
      </div>
    </div>
  `
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
} 