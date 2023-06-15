import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private urlMovies = 'http://localhost:8000/movies';
  private urlGenres = 'http://localhost:8000/genres';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getAllMovies(): Observable<any> {
    return this.http.get<any>(this.urlMovies);
  }

  getMovieById(id: String): Observable<any> {
    const url = `${this.urlMovies}/${id}`;
    return this.http.get<any>(url);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.urlMovies, movie);
  }

  updateMovie(id: String, movie: any): Observable<any> {
    console.log("aqui")
    const url = `${this.urlMovies}/${id}`;
    return this.http.put<any>(url, movie);
  }

  deleteMovie(id: string): Observable<any> {
    const url = `${this.urlMovies}/${id}`;
    return this.http.delete<any>(url);
  }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.urlGenres);
  }

}