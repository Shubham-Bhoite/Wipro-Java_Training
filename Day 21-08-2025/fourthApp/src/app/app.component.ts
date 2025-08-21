import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VehicleCompComponent } from './vehicle-comp/vehicle-comp.component';

@Component({
  selector: 'app-root',
  imports: [VehicleCompComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fourthApp';
}
