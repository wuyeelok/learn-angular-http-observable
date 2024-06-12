import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        return this.handleHTTPError(err);
      })
    );
  }

  private handleHTTPError(error: HttpErrorResponse): Observable<never> {
    if (HttpStatusCode.NotFound === error.status) {
      return throwError(() => 'Error Interceptor: Page Not Found!!!!');
    } else if (HttpStatusCode.BadRequest === error.status) {
      return throwError(
        () => 'Error Interceptor: Bad Request, Need to Check Request!!!'
      );
    } else if (HttpStatusCode.Unauthorized === error.status) {
      return throwError(
        () => 'Error Interceptor: Bad Request, Need to Check header!!!'
      );
    } else {
      return throwError(() => 'Error Interceptor: Unknown Error!!!');
    }
  }
}
