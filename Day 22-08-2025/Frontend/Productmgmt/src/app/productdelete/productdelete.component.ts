import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Productservice } from '../productservice.service';

@Component({
  selector: 'app-productdelete',
  imports: [],
  templateUrl: './productdelete.component.html',
  styleUrl: './productdelete.component.css'
})
export class ProductdeleteComponent implements OnInit{
  id: string | null = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: Productservice,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    console.log("Product to be deleted has id:", this.id);

    if (this.id) {
      this.productService.deleteProduct(this.id).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          this.router.navigate(['/productlist']); // Navigate to the product list after deletion
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          // Handle error, e.g., show an error message
        }
      });
    }
  }

}
