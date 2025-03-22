  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';
  import { MatToolbarModule } from '@angular/material/toolbar';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
import { sharedModule } from '../../../shared/shared.module';

  @Component({
    selector: 'app-header',
    standalone: true,
    imports: [
    sharedModule
    ],
    template: `
     <header class="fixed top-0 left-0 w-full backdrop-blur-xl bg-zinc-900  bg-opacity-70 border-b border-gray-800 shadow-md z-50">
  <div class="max-w-7xl mx-auto px-6">
    <div class="flex items-center justify-between h-16">
      
      <a [routerLink]="['/']" class="flex items-center text-white transition-transform transform hover:scale-105">
        <div class="w-10 h-10 bg-gray-900 bg-opacity-50 rounded-lg flex items-center justify-center shadow-lg mr-3">
          <mat-icon class="text-green-400 text-lg">inventory_2</mat-icon>
        </div>
        <span class="font-semibold text-xl tracking-wide text-white">Product Management</span>
      </a>

      <nav class="hidden md:flex space-x-6">
        <a [routerLink]="['/']" 
          routerLinkActive="text-green-400 font-medium"
          [routerLinkActiveOptions]="{exact: true}"
          class="px-5 py-2 rounded-md text-gray-300 hover:text-green-400 hover:bg-gray-800 transition-all">
          Home
        </a>
        <a [routerLink]="['/products']"
          routerLinkActive="text-green-400 font-medium"
          class="px-5 py-2 rounded-md text-gray-300 hover:text-green-400 hover:bg-gray-800 transition-all">
          Products
        </a>
      </nav>

      <button class="md:hidden p-3 rounded-lg text-white bg-gray-900 bg-opacity-50 hover:bg-gray-800 transition-transform transform hover:scale-110">
        <mat-icon>menu</mat-icon>
      </button>
    </div>
  </div>
</header>

    `
  })
  export class HeaderComponent {}
