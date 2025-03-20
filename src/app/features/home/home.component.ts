import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="bg-gradient-to-b from-indigo-50 to-white min-h-screen">
      <div class="container mx-auto px-4 py-12">
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Product Management System
          </h1>
          <p class="text-xl text-gray-600 mb-8">
            A complete solution for managing your product inventory with ease
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a [routerLink]="['/products']" 
               class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg
                      flex items-center justify-center">
              <mat-icon class="mr-2">inventory_2</mat-icon>
              View Products
            </a>
            <a [routerLink]="['/products/create']" 
               class="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg
                      flex items-center justify-center">
              <mat-icon class="mr-2">add_circle</mat-icon>
              Add New Product
            </a>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8 text-left">
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <mat-icon class="text-indigo-600">search</mat-icon>
              </div>
              <h3 class="text-xl font-semibold mb-2">Browse Products</h3>
              <p class="text-gray-600">
                View all your products in one place with powerful filtering and search capabilities.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <mat-icon class="text-indigo-600">edit</mat-icon>
              </div>
              <h3 class="text-xl font-semibold mb-2">Manage Inventory</h3>
              <p class="text-gray-600">
                Create, update, and remove products from your inventory with ease.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md">
              <div class="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <mat-icon class="text-indigo-600">insights</mat-icon>
              </div>
              <h3 class="text-xl font-semibold mb-2">Track Performance</h3>
              <p class="text-gray-600">
                Get insights into your product performance and inventory levels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {} 