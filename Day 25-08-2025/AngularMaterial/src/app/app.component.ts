import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveComponent } from './reactive/reactive.component';
import { RegistrationComponent } from './registration/registration.component';
import { ValidationComponent } from './validation/validation.component';

@Component({
  selector: 'app-root',
  imports: [ MatListModule,MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, ValidationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 // ex-01 -cities = ['Mumbai', 'Delhi', 'Pune', 'Chennai', 'Bengaluru', 'Hyderabad', 'Kolkata'];


  //  ex-02 -private _formBuilder = inject(FormBuilder);
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: ['', Validators.required],
  // });
  //  thirdFormGroup = this._formBuilder.group({
  //   thirdCtrl: ['', Validators.required],
  // });
  // isLinear = false;



}
