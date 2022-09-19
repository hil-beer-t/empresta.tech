import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private user: UserService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.user.getToken();

    if (token) {
      const requestWithToken = request.clone({
        params: request.params,
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          })
      })
      return next.handle(requestWithToken)
    }

    return next.handle(request);
  }
}
