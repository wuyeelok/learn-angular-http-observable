import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieSearchResult as MovieSearchResult } from '../interface/movie-search-result';
import { MovieSearchResponse as MovieSearchResponse } from '../interface/movie-search-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.movieApiUrl;
  private apiAccessToken: string = environment.movieApiAccessToken;

  constructor() {}

  displayPopularMovies(): Observable<MovieSearchResult[]> {
    let myParams: HttpParams = new HttpParams();
    myParams = myParams.set('language', 'en-US');
    myParams = myParams.set('page', '1');

    return this.http
      .get<MovieSearchResponse>(`/movie/popular`, {
        params: myParams,
      })
      .pipe(map((movie) => movie.results));
  }

  searchMovies(query: string, page: number): Observable<MovieSearchResult[]> {
    let processPage = page;
    if (!page) {
      processPage = 1;
    }

    let myParams: HttpParams = new HttpParams();
    myParams = myParams.set('query', query);
    myParams = myParams.set('language', 'en-US');
    myParams = myParams.set('page', processPage);

    return this.http
      .get<MovieSearchResponse>(`/search/mov23423434ie`, {
        params: myParams,
      })
      .pipe(map((data) => data.results));
  }

  getNowPlayingMovies(
    page: number
  ): Observable<HttpEvent<HttpEvent<MovieSearchResponse>>> {
    let processPage = page;
    if (!page) {
      processPage = 1;
    }

    let myParams: HttpParams = new HttpParams();
    myParams = myParams.set('language', 'en-US');
    myParams = myParams.set('page', processPage);

    return this.http.get<HttpEvent<MovieSearchResponse>>(`/movie/now_playing`, {
      params: myParams,
      observe: 'events',
      reportProgress: true,
    });
  }
}
