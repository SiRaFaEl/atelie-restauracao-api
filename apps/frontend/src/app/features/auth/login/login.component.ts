import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { getApiErrorMessage } from '../../../core/api-error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Atelie Restauracao
        </h1>

        <div
          *ngIf="infoMessage()"
          class="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-4"
        >
          {{ infoMessage() }}
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
            <div *ngIf="isFieldInvalid('email')" class="text-red-600 text-sm mt-1">
              Informe um e-mail valido.
            </div>
          </div>

          <div>
            <label for="senha" class="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              formControlName="senha"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Sua senha"
            />
            <div *ngIf="isFieldInvalid('senha')" class="text-red-600 text-sm mt-1">
              Senha e obrigatoria.
            </div>
          </div>

          <div
            *ngIf="errorMessage()"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
          >
            {{ errorMessage() }}
          </div>

          <button
            type="submit"
            [disabled]="isLoading()"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {{ isLoading() ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="text-center mt-6 text-gray-600">
          Nao tem conta?
          <a routerLink="/register" class="text-blue-600 hover:underline font-semibold">
            Cadastre-se aqui
          </a>
        </p>
        <p class="text-center mt-2">
          <a routerLink="/login" class="text-blue-600 hover:underline font-semibold">
            Recuperar senha
          </a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  infoMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.fb.group({
      email: ['admin@atelie.com', [Validators.required, Validators.email]],
      senha: ['admin123', [Validators.required]],
    });
    this.infoMessage.set(this.route.snapshot.queryParamMap.get('message') ?? '');
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.infoMessage.set('');

    const { email, senha } = this.loginForm.value;
    this.authService.login(email, senha).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage.set(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return !!(formField && formField.invalid && formField.touched);
  }
}
