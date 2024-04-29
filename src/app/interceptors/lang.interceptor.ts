import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class LangInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let lang = localStorage.getItem('lang') || 'vi';
    const modifiedRequest = request.clone({
      setHeaders: {
        'Accept-Language': lang,
      },
    });
    return next.handle(modifiedRequest);
  }
}
