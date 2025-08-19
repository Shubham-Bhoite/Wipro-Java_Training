import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ex-01-displaylist',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './ex-01-displaylist.component.html',
  styleUrls: ['./ex-01-displaylist.component.css']
})
export class Ex01DisplaylistComponent {
  // fruits = [
  //   {
  //     name: 'Apple',
  //     image: 'https://t4.ftcdn.net/jpg/04/96/45/49/360_F_496454926_VsM8D2yyMDFzAm8kGCNFd7vkKpt7drrK.jpg',
  //     description: 'Apples are nutritious and good for health.'
  //   },
  //   {
  //     name: 'Strawberries',
  //     image: 'https://cdn.pixabay.com/photo/2022/05/27/10/35/strawberry-7224875_640.jpg',
  //     description: 'Strawberries contains vitamin C, antioxidants, and other beneficial nutrients'
  //   },
  //   {
  //     name: 'Orange',
  //     image: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
  //     description: 'Oranges are a great source of Vitamin C.'
  //   },
  //   {
  //     name: 'Kiwi ',
  //     image: 'https://www.hdwallpapers.in/download/kiwi_macro_fruits_hd_fruit-HD.jpg',
  //     description: 'Kiwi contains vitamin K, vitamin E, folate, potassium.'
  //   }
  // ];
  
}
