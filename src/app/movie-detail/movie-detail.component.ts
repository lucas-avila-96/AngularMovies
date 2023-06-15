import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = params["id"];
      console.log(movieId);
      this.getMovieById(movieId);
    });
  }

  getMovieById(id: string): void { this.movieService.getMovieById(id).subscribe({
      next: (data) => {
        this.movie = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  goToUpdateMovie(): void {
    this.router.navigate(['/movies/update/', this.movie.id]);
  }
  goToDeleteMovie(): void {
    if (this.movie.id) {
      this.movieService.deleteMovie(this.movie.id).subscribe(
        () => {
          // Aquí puedes realizar alguna acción después de eliminar la película, como mostrar una notificación o redireccionar a otra página.
          this.router.navigate(['/movies/delete/', this.movie.id])
        },
        error => {
          console.error('Error al eliminar la película:', error);
        }
      );
    } else {
      console.warn('Debes proporcionar un ID de película');
    }
  }
    // this.router.navigate(['/movies/delete/', this.movie.id])
  }

