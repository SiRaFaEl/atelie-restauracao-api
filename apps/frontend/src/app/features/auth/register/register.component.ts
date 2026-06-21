import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { getApiErrorMessage } from '../../../core/api-error';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-3xl font-bold text-center text-gray-800 mb-8">
          Criar Conta
        </h1>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-6">
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              type="text"
              id="nome"
              formControlName="nome"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Seu nome"
            />
            <div *ngIf="isFieldInvalid('nome')" class="text-red-600 text-sm mt-1">
              Nome e obrigatorio.
            </div>
          </div>

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
              placeholder="Minimo 6 caracteres"
            />
            <div *ngIf="isFieldInvalid('senha')" class="text-red-600 text-sm mt-1">
              Senha deve ter no minimo 6 caracteres.
            </div>
          </div>

          <div
            *ngIf="errorMessage()"
            class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
          >
            {{ errorMessage() }}
          </div>

          <div
            *ngIf="successMessage()"
            class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded"
          >
            {{ successMessage() }}
          </div>

          <button
            type="submit"
            [disabled]="isLoading()"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            {{ isLoading() ? 'Criando conta...' : 'Criar Conta' }}
          </button>
        </form>

        <p class="text-center mt-6 text-gray-600">
          Ja tem conta?
          <a routerLink="/login" class="text-blue-600 hover:underline font-semibold">
            Faca login
          </a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.successMessage.set(response.message);
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.errorMessage.set(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.registerForm.get(field);
    return !!(formField && formField.invalid && formField.touched);
  }
}
