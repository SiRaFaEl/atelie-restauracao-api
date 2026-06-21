import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  nome: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  token = signal<string | null>(null);
  user = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  register(registerData: {
    nome: string;
    email: string;
    senha: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/register`,
      registerData,
    );
  }

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      senha,
    }).pipe(
      tap((response) => {
        this.token.set(response.access_token);
        this.user.set(response.user);
        this.isAuthenticated.set(true);
      }),
    );
  }

  logout(message?: string) {
    this.token.set(null);
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login'], {
      queryParams: message ? { message } : undefined,
    });
  }

  getToken(): string | null {
    return this.token();
  }

  getUser(): User | null {
    return this.user();
  }

  isAdmin(): boolean {
    const user = this.user();
    return user?.role === 'admin';
  }
}
