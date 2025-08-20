import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CToFPipe } from './c-to-f.pipe';
import { HighlightStrikethruDirective } from './highlight-strikethru.directive';


@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, HighlightStrikethruDirective],
  standalone: true, 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  // EX-01
  inputText: string = '';

  // EX-02
  selectedDate: string | null = null;

  // Ex-03
  temperatureC: number =0;
}
