import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../Interface/food';
import { FoodService } from '../../Services/food.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-food-list',
  imports: [CommonModule, FormsModule],
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

    let tokendata:any=localStorage.getItem("tokenValue");
    if(tokendata==null)
    {
        this.router.navigate(["/login"])
    }

  this.foodService.getFoods().subscribe({
    next: (data) => {
      console.log('Foods from backend:', data);  
      this.foods = data;
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Error fetching foods:', err)
  });
}
logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
    
  }

  toCart(){
    this.router.navigate(['/orders'])
  }

  orderNow(food: Food) {
  console.log("Ordering food:", food);
  // navigate to order page or add to cart logic
}



}