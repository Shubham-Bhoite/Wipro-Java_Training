import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent {
  fName = new FormControl('');
  reversed: string = '';

  constructor() {
    this.fName.valueChanges.subscribe((value: string | null) => {
      if (value) {
        this.reversed = value.split('').reverse().join('');
      } else {
        this.reversed = '';
      }
    });
  }

}
