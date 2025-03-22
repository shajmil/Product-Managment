import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDividerModule,
  MatDialogModule
];

const commonModules = [
  CommonModule,
  ReactiveFormsModule,
  RouterModule
];

@NgModule({
  declarations: [],
  imports: [
    ...commonModules,
    ...materialModules
  ],
  exports: [
    ...commonModules,
    ...materialModules
  ]
})
export class sharedModule { } 