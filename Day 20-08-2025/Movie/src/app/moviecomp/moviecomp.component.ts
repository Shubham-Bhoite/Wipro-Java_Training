import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieserviceService } from '../movieservice.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-moviecomp',
  imports: [FormsModule, CommonModule],
  standalone:true,
  templateUrl: './moviecomp.component.html',
  styleUrls: ['./moviecomp.component.css']
})
export class MoviecompComponent {
  movies: Movie [] = [];
  movieId: string = '';
  movieIdAdd: string = '';
  movieNameAdd: string = '';
  languageAdd: string = '';
  imdbRatingAdd: number = 0;

  constructor(private movieService: MovieserviceService) {
    this.movies = this.movieService.getMovies();
  }

  delete(): void {
    this.movieService.deleteByMovieId(this.movieId);
    this.movies = this.movieService.getMovies();
    this.movieId = '';
  }

  save(): void {
    const newMovie: Movie = {
      movieId: this.movieIdAdd,
      movieName: this.movieNameAdd,
      language: this.languageAdd,
      imdbRating: this.imdbRatingAdd
    };
    this.movieService.addMovie(newMovie);
    this.movies = this.movieService.getMovies();

    this.clearForm();
  }

  update(): void {
    const updatedMovie: Movie = {
      movieId: this.movieIdAdd,
      movieName: this.movieNameAdd,
      language: this.languageAdd,
      imdbRating: this.imdbRatingAdd
    };
    this.movieService.updateMovie(updatedMovie);
    this.movies = this.movieService.getMovies();

    this.clearForm();
  }

  edit(): void {
    const movie = this.movieService.findByMovieId(this.movieId);
    if (movie) {
      this.movieIdAdd = movie.movieId;
      this.movieNameAdd = movie.movieName;
      this.languageAdd = movie.language;
      this.imdbRatingAdd = movie.imdbRating;
    } else {
      alert('Movie not found');
    }
  }

  private clearForm(): void {
    this.movieIdAdd = '';
    this.movieNameAdd = '';
    this.languageAdd = '';
    this.imdbRatingAdd = 0;
  }

}
