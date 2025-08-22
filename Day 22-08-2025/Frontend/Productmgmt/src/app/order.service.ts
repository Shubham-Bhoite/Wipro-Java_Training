import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(productId: number, qty: number): Observable<any> {
    return this.http.post<any>("http://localhost:9000/order/place", { productId, qty });
  }

  getOrderHistory(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:9000/order/history");
  }
}
