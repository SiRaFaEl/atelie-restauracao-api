import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          authService.logout('Sessão expirada. Faça login novamente.');
        }
        return throwError(() => error);
      }),
    );
  }

  return next(req);
};
