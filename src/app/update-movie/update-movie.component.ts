import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent implements OnInit {
  movieId : any;
  genres: any[] = [];
  movieData: any = {
    title: '',
    synopsis: '',
    year: '',
    duration: '',
    genre: null
  };
  error: string = "";
  successMessage:string = "";

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.loadMovieData();
      this.loadGenres();
    });
  }
  
  loadGenres() {
    this.movieService.getGenres()
      .subscribe(
        response => {
          this.genres = response;
        },
        error => {
          this.error = 'Error al cargar los géneros';
          console.error(error);
        }
      );
  }

  loadMovieData() {
    this.movieService.getMovieById(this.movieId)
      .subscribe(
        response => {
          this.movieData = response;
        },
        error => {
          this.error = 'Error al cargar los datos de la película';
          console.error(error);
        }
      );
  }

 updateMovie() {
  this.movieService.updateMovie(this.movieId, this.movieData).subscribe({
      next: () => {
        this.successMessage = 'Pelcula actualizada correctamente';
      },
      error: error => {
        this.error = 'Error al actualizar la película';
        console.error(error);
      }
    });

  }
  
  }
