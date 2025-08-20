import { Injectable } from '@angular/core';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  private movieList: Movie[] = [
    { movieId: 'M101', movieName: 'Inception', language: 'English', imdbRating: 8.8 },
    { movieId: 'M102', movieName: '3 Idiots', language: 'Hindi', imdbRating: 8.4 },
    { movieId: 'M103', movieName: 'Spirited Away', language: 'Japanese', imdbRating: 8.6 }
  ];

  getMovies(): Movie[] {
    return this.movieList;
  }

  addMovie(movie: Movie): void {
    this.movieList.push(movie);
  }

  deleteByMovieId(movieId: string): void {
    this.movieList = this.movieList.filter(m => m.movieId !== movieId);
  }

  findByMovieId(movieId: string): Movie | undefined {
    return this.movieList.find(m => m.movieId === movieId);
  }

  updateMovie(movie: Movie): void {
    const index = this.movieList.findIndex(m => m.movieId === movie.movieId);
    if (index !== -1) {
      this.movieList[index] = movie;
    } else {
      console.error(`Movie with ID ${movie.movieId} not found.`);
    }
  }
}
