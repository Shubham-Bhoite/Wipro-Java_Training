import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgFor } from '@angular/common';
import { Order } from '../../Interface/order';
import { OrderService } from '../../Services/order-service.service';
import { Router } from '@angular/router';
import { FoodService } from '../../Services/food.service';
import { Food } from '../../Interface/food';
import { OrderItem } from '../../Interface/order-item';

@Component({
  selector: 'app-order-page',
  imports: [FormsModule, CurrencyPipe, NgFor],
  standalone:true,
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPage {

removeItem(i: number) {
 this.cart.splice(i, 1)
}

  constructor(private orderService:OrderService, 
    private router:Router,
    private foodService:FoodService
  ){}


  foods:Food[] = [
    {id:0, foodName:"", description:'', image:'', price:0},
  ]
  cart:OrderItem[] = []
  selectedFoodId:number = 0
  order:Order = {
    items:[{foodId:0, quantity:0}]
  }
  totalPrice:number=0

  ngOnInit(){
    let token = localStorage.getItem("tokenValue")
    this.foodService.getFoods().subscribe((data)=>{
      this.foods = data;
    })
  }

  getFood(foodId:number){
    return this.foods.find(f=> f.id == foodId)
  }

 addItem(quantityInput:HTMLInputElement){
  if(!this.selectedFoodId) return;

  const quantity = Number.parseInt(quantityInput.value);
  if(!quantity || quantity<=0) return;

  // check if item already exists in cart
  const existing = this.cart.find(item=> item.foodId == this.selectedFoodId);
  if(existing){
    existing.quantity += quantity
  }else{
    const food = this.foods.find(f=> f.id== this.selectedFoodId);
    if(food){
        this.cart.push({foodId:food.id, quantity: quantity})
  }

  }
  this.selectedFoodId = 0;
  quantityInput.value = '' 
  this.totalPriceCalculation() 
}

  totalPriceCalculation(){

    this.totalPrice = this.cart.reduce(
      (sum, item)=>{
        const food = this.foods.find(f=> f.id == item.foodId);
        const price = food?.price ?? 0;
        return sum + item.quantity * price
      }, 0
    )

  }

  placeOrder() {
    console.log("token :" + localStorage.getItem('tokenValue'))
    this.order.items = this.cart
    console.log(this.order)
    this.orderService.save(this.order).subscribe((data)=>{
    console.log(data);
    this.order = data;
    this.router.navigate(['/payment'+'/'+data.id+'/'+this.order.orderValue])
    })
    
}
}