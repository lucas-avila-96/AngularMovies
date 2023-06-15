
import { Component } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-delete-movie',
  templateUrl: './delete-movie.component.html',
  styleUrls: ['./delete-movie.component.css']
})
export class DeleteMovieComponent {
  movieId: any;

  constructor(private apiService: MovieService) {}

  deleteMovie() {
    if (this.movieId) {
      this.apiService.deleteMovie(this.movieId).subscribe(
        () => {
          // Aquí puedes realizar alguna acción después de eliminar la película, como mostrar una notificación o redireccionar a otra página.
          console.log('Película eliminada exitosamente');
        },
        error => {
          console.error('Error al eliminar la película:', error);
        }
      );
    } else {
      console.warn('Debes proporcionar un ID de película');
    }
  }
}
