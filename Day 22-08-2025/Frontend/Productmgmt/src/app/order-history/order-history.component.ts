import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrderHistory().subscribe(data => this.orders = data);
  }

}
