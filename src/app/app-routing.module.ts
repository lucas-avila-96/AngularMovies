import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { UpdateMovieComponent } from './update-movie/update-movie.component';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/add', component: AddMovieComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
  { path: 'movies/update/:id', component: UpdateMovieComponent },
  { path: 'movies/delete/:id', component:  DeleteMovieComponent},
  { path: 'genres/:id/all', component:  MovieListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
