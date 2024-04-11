import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token');
    if (token!=undefined) {
      const isPublicUrl = request.url.includes('public');
      if (isPublicUrl) {
        return next.handle(request);
      } else {
        const modifiedRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next.handle(modifiedRequest);
      }
    } else {
      return next.handle(request);
    }
  }
  
}
