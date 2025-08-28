import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../Interface/food';
import { BASE_URL } from '../Utils/appConstant';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient) {}

  // Get all foods
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>(`${BASE_URL}/foods`);
  }

  // Add new food
  addFoods(food: Food): Observable<Food> {
    return this.http.post<Food>(`${BASE_URL}/foods`, food);
  }

  // Delete food by ID
  deleteFood(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/foods/${id}`);
  }
}
