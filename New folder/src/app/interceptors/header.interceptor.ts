import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const token = localStorage.getItem("token")
    const modifiedRequest= request.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    })
    // console.log("outgoing request",modifiedRequest)
    return next.handle(modifiedRequest);
  }
}