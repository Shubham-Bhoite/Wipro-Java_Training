import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../Interface/food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) { }

  foodUrl: string = 'http://localhost:9191/foods';

  private getHeaders() {
    const token = localStorage.getItem('token');  // token saved after login
    return new HttpHeaders().set('Authorization', token ? token : '');
  }

  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(this.foodUrl, { headers: this.getHeaders() });
  }

  addFoods(foods: Food): Observable<Food> {
    return this.http.post<Food>(this.foodUrl, foods, { headers: this.getHeaders() });
  }

  deleteFood(id: number) {
    return this.http.delete(`${this.foodUrl}/${id}`, { headers: this.getHeaders() });
  }
}
