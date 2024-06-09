import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopMovieResult } from '../interface/pop-movie-result';
import { PopMovieSearch } from '../interface/pop-movie-search';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.movieApiUrl;
  private apiAccessToken: string = environment.movieApiAccessToken;

  constructor() {}

  displayPopularMovies(): Observable<PopMovieResult[]> {
    return this.http
      .get<PopMovieSearch>(`${this.apiUrl}/movie/popular`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${this.apiAccessToken}`,
        },
      })
      .pipe(map((movie) => movie.results));
  }
}
