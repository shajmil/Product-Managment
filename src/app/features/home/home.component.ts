import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { sharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
sharedModule
  ],
  template: `
<div class="relative min-h-screen bg-zinc-900  text-white px-8 py-12">
  <div class="max-w-6xl mx-auto">

    <div class="flex flex-col md:flex-row items-center md:justify-between mb-16 gap-8">
      <div class="text-left max-w-xl">
        <h1 class="text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          <span class="tracking-tight">Product</span> <span class="text-green-400">Management</span> System
        </h1>
        <p class="text-lg text-gray-400 mt-4">
          A futuristic solution to streamline your inventory management.
        </p>
        <div class="flex flex-wrap gap-4 mt-6">
          <a [routerLink]="['/products']" 
            class="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-3 rounded-full
                  flex items-center justify-center shadow-xl transition-transform transform hover:scale-105 hover:shadow-green-500/50">
            <mat-icon class="mr-2">inventory_2</mat-icon>
            View Products
          </a>
          <a [routerLink]="['/products/create']" 
            class="bg-transparent border border-green-400 text-green-400 px-6 py-3 rounded-full
                  flex items-center justify-center transition-transform transform hover:scale-105 hover:shadow-green-500/50">
            <mat-icon class="mr-2">add_circle</mat-icon>
            Add Product
          </a>
        </div>
      </div>

      <div class="relative w-full md:w-2/5">
        <div class="rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl bg-gray-900 bg-opacity-30 p-6">
          <img src="assets/images/3d-rendering-cartoon-house1.jpg"
               alt="Product Management" class="w-full h-auto rounded-xl">
        </div>
      </div>
    </div>

    <div class="bg-gray-900 bg-opacity-50 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-800">
      <h2 class="text-2xl font-bold text-white mb-6 text-center tracking-wide">🚀 Manage Products Efficiently</h2>
      
      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-md transition-transform hover:scale-105">
          <div class="flex items-center mb-3">
            <mat-icon class="text-green-400 text-2xl mr-3">search</mat-icon>
            <h3 class="text-lg font-semibold">Browse Products</h3>
          </div>
          <p class="text-gray-400 text-sm">View all products with advanced filtering and search capabilities.</p>
        </div>

        <div class="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-md transition-transform hover:scale-105">
          <div class="flex items-center mb-3">
            <mat-icon class="text-green-400 text-2xl mr-3">edit</mat-icon>
            <h3 class="text-lg font-semibold">Manage Inventory</h3>
          </div>
          <p class="text-gray-400 text-sm">Create, update, and remove products effortlessly.</p>
        </div>

        <div class="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl shadow-md transition-transform hover:scale-105">
          <div class="flex items-center mb-3">
            <mat-icon class="text-green-400 text-2xl mr-3">insights</mat-icon>
            <h3 class="text-lg font-semibold">Track Performance</h3>
          </div>
          <p class="text-gray-400 text-sm">Gain insights into product trends and stock levels.</p>
        </div>
      </div>
    </div>


  </div>
</div>

  `
})
export class HomeComponent {}