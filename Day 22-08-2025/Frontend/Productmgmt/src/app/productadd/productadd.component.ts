import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Productservice } from '../productservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productadd',
  imports: [FormsModule],
  templateUrl: './productadd.component.html',
  styleUrl: './productadd.component.css'
})
export class ProductaddComponent {
  
  constructor(private productService: Productservice, private router: Router) { }

  productName: string = '';
  productCategory: string = '';
  productPrice: number = 0;
  productQty: number = 0;

  submit() {
    console.log('Adding product:', this.productName, this.productCategory, this.productPrice);

    this.productService.addProduct({
      name: this.productName,
      category: this.productCategory,
      price: this.productPrice,
      qty: this.productQty
    }).subscribe(response => {
      console.log('Product added successfully:', response);

      this.productName = '';
      this.productCategory = '';
      this.productPrice = 0;
      this.productQty=0;

      this.router.navigate(['/productlist']);
    }, error => {
      console.error('Error adding product:', error);
    });
  }
}
