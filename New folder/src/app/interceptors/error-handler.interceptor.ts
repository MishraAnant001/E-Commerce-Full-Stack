import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {  catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router :Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log('Outgoing HTTP request', request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error)
        //  let errorMsg = '';
         if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            // errorMsg = `Error: ${error.error.message}`;
         } else {
            console.log('This is server side error');
            if(error.status==500){
              this.router.navigate(['internal-error'])
            }
            else if(error.status==401){
              Swal.fire({
                icon:'error',
                title:'Unauthorized access',
                showConfirmButton:false,
                timer:1000
              }).then(()=>{
                this.router.navigate(['login'])
              })
            }
            // errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
         }
        //  console.log(error);
        //  return new Observable()
        return throwError(() => error);
      })
)
  }
}
