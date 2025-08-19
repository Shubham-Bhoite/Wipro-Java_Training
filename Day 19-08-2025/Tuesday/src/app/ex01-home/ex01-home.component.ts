import { Component } from '@angular/core';
import { Ex01DisplaylistComponent } from '../ex-01-displaylist/ex-01-displaylist.component';
import { CommonModule } from '@angular/common';
import { Ex05FruitComponent } from '../ex05-fruit/ex05-fruit.component';
import { Ex06Ifruit } from '../ex06-ifruit';


@Component({
  selector: 'app-ex01-home',
  standalone: true,
  imports: [Ex05FruitComponent, CommonModule],
  templateUrl: './ex01-home.component.html',
  styleUrls: ['./ex01-home.component.css']
})
export class Ex01HomeComponent {
  fruits: Ex06Ifruit[] = [
    {
      name: 'Apple',
      image: 'https://t4.ftcdn.net/jpg/04/96/45/49/360_F_496454926_VsM8D2yyMDFzAm8kGCNFd7vkKpt7drrK.jpg',
      description: 'Apples are nutritious and good for health.'
    },
    {
      name: 'Strawberries',
      image: 'https://cdn.pixabay.com/photo/2022/05/27/10/35/strawberry-7224875_640.jpg',
      description: 'Strawberries contains vitamin C, antioxidants, and other beneficial nutrients'
    },
    {
      name: 'Orange',
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
      description: 'Oranges are a great source of Vitamin C.'
    },
    {
      name: 'Kiwi ',
      image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l3aXxlbnwwfHwwfHx8MA%3D%3D',
      description: 'Kiwi contains vitamin K, vitamin E, folate, potassium.'
    }
  ];
  
  removeFruit(fruitName: string) {
    console.log("Remove button clicked - " + fruitName);
    this.fruits = this.fruits.filter(fruit => fruit.name !== fruitName);
  }
}
