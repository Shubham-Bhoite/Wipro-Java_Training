import { Component } from '@angular/core';
import { Ex01HomeComponent } from './ex01-home/ex01-home.component';
import { NgClass } from '@angular/common';
import { Ex03AttributeComponent } from './ex03-attribute/ex03-attribute.component';
import { Ex02FunctionComponent } from './ex02-function/ex02-function.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Ex01HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   
})
export class AppComponent {
  title = 'Tuesday';
  
}
