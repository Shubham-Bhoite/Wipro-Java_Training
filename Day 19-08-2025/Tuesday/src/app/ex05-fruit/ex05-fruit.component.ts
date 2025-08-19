import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ex06Ifruit } from '../ex06-ifruit';

@Component({
  selector: 'app-ex05-fruit',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './ex05-fruit.component.html',
  styleUrls: ['./ex05-fruit.component.css']
})
export class Ex05FruitComponent {
// @Input() name!: string;
//   @Input() image!: string;
//   @Input() description!: string;

  @Input() fruit!: Ex06Ifruit;

  @Output() btnClick = new EventEmitter<string>();

  onRemove(name: string) {
    console.log("Remove clicked - " + name);
    this.btnClick.emit(name);
  }
}
