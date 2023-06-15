import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent implements OnInit {
  movieId: any;
  movieTitle: string = "";
  error: string = "";
  successMessage = '';
  countdown: number = 5;
  showRedirectMessage: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.loadMovieTitle();
    });
  }

  loadMovieTitle() {
    this.movieService.getMovieById(this.movieId)
      .subscribe(
        response => {
          this.movieTitle = response.title;
        },
        error => {
          this.error = 'Error al cargar el título de la película';
          console.error(error);
        }
      );
  }

  deleteMovie() {
    this.movieService.deleteMovie(this.movieId)
      .subscribe(
        () => {
        this.successMessage = 'Película eliminada correctamente';

        this.showRedirectMessage = true;

        setInterval(() => {
          this.countdown--;
        }, 1000);
    
        // Redirigir a la página de inicio después de 5 segundos
        setTimeout(() => {
          this.router.navigate(['/']);
        }, this.countdown * 1000);
        },
        error => {
          this.error = 'Error al eliminar la película';
          console.error(error);
        }
      );
  }
}
