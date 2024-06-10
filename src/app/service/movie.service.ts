import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PopMovieResult as MovieSearchResult } from '../interface/pop-movie-result';
import { PopMovieSearch as MovieSearch } from '../interface/pop-movie-search';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.movieApiUrl;
  private apiAccessToken: string = environment.movieApiAccessToken;

  constructor() {}

  displayPopularMovies(): Observable<MovieSearchResult[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.apiAccessToken}`);

    let myParams: HttpParams = new HttpParams();
    myParams = myParams.set('language', 'en-US');
    myParams = myParams.set('page', '1');

    return this.http
      .get<MovieSearch>(`${this.apiUrl}/movie/popular`, {
        headers: headers,
        params: myParams,
      })
      .pipe(map((movie) => movie.results));
  }

  searchMovies(query: string, page: number): Observable<MovieSearchResult[]> {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Authorization', `Bearer ${this.apiAccessToken}`);

    let processPage = page;
    if (!page) {
      processPage = 1;
    }

    let myParams: HttpParams = new HttpParams();
    myParams = myParams.set('query', query);
    myParams = myParams.set('language', 'en-US');
    myParams = myParams.set('page', processPage);

    return this.http
      .get<MovieSearch>(`${this.apiUrl}/search/movie`, {
        headers: myHeaders,
        params: myParams,
      })
      .pipe(map((data) => data.results));
  }
}
