import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Product, ProductCreateUpdate } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://prodect-managemnt-mockapi-production.up.railway.app/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, limit: number = 10): Observable<{ items: Product[], total: number }> {
    const params = new HttpParams()
      .set('_page', page.toString())
      .set('_per_page', limit.toString());
    
    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
      if (response.data && response.items !== undefined) {
          return {
            items: response.data,
            total: response.items
          };
        } else if (Array.isArray(response)) {
          return {
            items: response,
            total: response.length
          };
        } else {
          console.error('Unexpected API response format:', response);
          return { items: [], total: 0 };
        }
      }),
      catchError(error => {
        console.error('Error fetching products:', error);
        return of({ items: [], total: 0 });
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: ProductCreateUpdate): Observable<Product> {
    console.log('Sending product to API:', product);
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(error => {
        console.error('Error in API call:', error);
        return throwError(() => error);
      })
    );
  }
  

  updateProduct(id: string, product: ProductCreateUpdate): Observable<Product> {
    const updatedProduct = {
      ...product,
      updatedAt: new Date()
    };
    return this.http.put<Product>(`${this.apiUrl}/${id}`, updatedProduct);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 