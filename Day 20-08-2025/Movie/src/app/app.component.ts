import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MoviecompComponent } from './moviecomp/moviecomp.component';

@Component({
  selector: 'app-root',
  imports: [MoviecompComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Movie';
}
