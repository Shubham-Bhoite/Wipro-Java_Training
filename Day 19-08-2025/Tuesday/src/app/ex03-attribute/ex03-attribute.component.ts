import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ex03-attribute',
  standalone: true,
  imports: [CommonModule],   
  templateUrl: './ex03-attribute.component.html',
  styleUrls: ['./ex03-attribute.component.css']
})
export class Ex03AttributeComponent {
  flag1 = true;
  flag2 = false;
  
}
