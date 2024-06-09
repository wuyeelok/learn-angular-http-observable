import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.apiAccessToken}`);

    return this.http
      .get<PopMovieSearch>(`${this.apiUrl}/movie/popular`, {
        headers: headers,
      })
      .pipe(map((movie) => movie.results));
  }
}
