import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <header class="bg-white shadow-sm">
      <div class="container mx-auto">
        <mat-toolbar>
          <a [routerLink]="['/']" class="flex items-center text-indigo-600">
            <mat-icon class="mr-2">inventory_2</mat-icon>
            <span class="font-semibold text-xl">ProductManager</span>
          </a>
          
          <div class="flex-grow"></div>
          
          <nav>
            <ul class="flex space-x-4">
              <li>
                <a [routerLink]="['/']" routerLinkActive="text-indigo-600" [routerLinkActiveOptions]="{exact: true}"
                   class="py-2 px-3 rounded-md hover:bg-gray-100">
                  Home
                </a>
              </li>
              <li>
                <a [routerLink]="['/products']" routerLinkActive="text-indigo-600"
                   class="py-2 px-3 rounded-md hover:bg-gray-100">
                  Products
                </a>
              </li>
            </ul>
          </nav>
        </mat-toolbar>
      </div>
    </header>
  `
})
export class HeaderComponent {} 