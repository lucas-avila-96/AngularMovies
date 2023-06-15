import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[];
  searchTerm: string;
  genres: any[] = [];

  constructor(private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router) {

    this.movies = [];
    this.searchTerm = '';
    this.genres = [];
    
    
  }

  ngOnInit() {
    this.getMovies();
    this.getGenres();
  }

  getGenres(): void {
    this.movieService.getGenres().subscribe({
      next: (genres) => {
        this.genres = genres;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  getMovies() {
    this.movieService.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  searchMovies(): void {
    if (!this.searchTerm) {
      // Si el término de búsqueda está vacío, mostrar todas las películas
      this.getMovies();
    } else {
      // Filtrar la lista de películas por título
      this.movies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
}
