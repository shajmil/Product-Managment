import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const snackBar = inject(MatSnackBar);
  
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred';
      
      if (error.error instanceof ErrorEvent) {
                      errorMessage = `Error: ${error.error.message}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      
      if (error.status === 0 && error.message.includes('Http failure response for')) {
        errorMessage = 'Server connection failed. Please make sure your backend server is running.';
      }
      
      snackBar.open(errorMessage, 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      
      return throwError(() => error);
    })
  );
};