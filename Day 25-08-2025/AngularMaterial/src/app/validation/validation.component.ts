import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-validation',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css'
})
export class ValidationComponent {
  fg;

  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({
      fName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.fg.valid) {
      console.log('Form Submitted:', this.fg.value);
      alert('Form Submitted Successfully!');
    }
  }

}
