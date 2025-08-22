import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({ providedIn: 'root' })
export class Productservice {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:9000/product");
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:9000/product", product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:9000/product/${id}`);
  }

  findProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`http://localhost:9000/product/${id}`);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.put<Product>("http://localhost:9000/product", product);
  }
}
