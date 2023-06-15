import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  genres: any[] = [];
  error: string = "";
  successMessage: string = '';

  movie: any = {
    title: '',
    synopsis: '',
    year: '',
    duration: '',
    genreId: ''

  };

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getGenres();
  }

  addMovie() {
    this.movieService.createMovie(this.movie).subscribe(
      () => {
        this.successMessage = 'Película agregada correctamente';
        this.clearForm();
      },
      error => {
        this.error = 'Error al agregar la película';
        console.error(error);
      }
    );
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

  clearForm() {
    this.movie = {
      title: '',
      synopsis: '',
      year: '',
      duration: '',
      genreId: ''
    };
  }
}
