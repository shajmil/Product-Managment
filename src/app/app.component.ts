import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-header></app-header>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto px-4 text-center">
          <p>© {{currentYear}} Product Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `
})
export class AppComponent {
  currentYear = new Date().getFullYear();
}
