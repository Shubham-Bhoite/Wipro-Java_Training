import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../Interface/food';
import { FoodService } from '../../Services/food.service';

@Component({
  selector: 'app-food-list',
  imports: [],
  standalone:true,
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodList {

  foods:Food[] = []

  constructor(private router: Router,
    private foodService: FoodService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
  this.foodService.getFoods().subscribe({
    next: (data) => {
      console.log('Foods from backend:', data);  // 👈 check here
      this.foods = data;
    },
    error: (err) => console.error('Error fetching foods:', err)
  });
}

}