import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ex02-function',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ex02-function.component.html',
  styleUrls: ['./ex02-function.component.css']
})
export class Ex02FunctionComponent {
  flag1 = true;
  flag2 = false;
  isHighlight = true;

  getNgClass() {
    return {
      app1: this.flag1,
      app2: this.flag2
    };
  }
  getNgStyle() {
    return {
      'color': this.isHighlight ? 'white' : 'black',
      'background-color': this.isHighlight ? 'green' : 'lightgray',
      'padding': '10px',
      'border-radius': '6px'
    };
  }

}
