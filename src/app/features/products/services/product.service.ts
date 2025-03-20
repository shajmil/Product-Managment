import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Product, ProductCreateUpdate } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, limit: number = 10): Observable<Product[]> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_limit', limit.toString());
    
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductCreateUpdate): Observable<Product> {
    console.log('Sending product to API:', product); // ✅ Check if this logs
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(error => {
        console.error('Error in API call:', error);
        return throwError(() => error);
      })
    );
  }
  

  updateProduct(id: number, product: ProductCreateUpdate): Observable<Product> {
    const updatedProduct = {
      ...product,
      updatedAt: new Date()
    };
    return this.http.put<Product>(`${this.apiUrl}/${id}`, updatedProduct);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 