import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MovieInterceptor implements HttpInterceptor {
  private apiAccessToken: string;
  private apiBaseUrl: string;

  constructor() {
    this.apiAccessToken = environment.movieApiAccessToken;
    this.apiBaseUrl = environment.movieApiUrl;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let myHeaders: HttpHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Authorization', `Bearer ${this.apiAccessToken}`);

    const outRequest: HttpRequest<unknown> = request.clone({
      headers: myHeaders,
      url: `${this.apiBaseUrl}${request.url}`,
    });

    console.log(
      'Movie interceptor:',
      outRequest.url,
      outRequest.headers,
      outRequest.params
    );

    return next.handle(outRequest);
  }
}
