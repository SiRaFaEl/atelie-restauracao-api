import { Component, inject, signal } from '@angular/core';
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
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="app-shell flex items-center justify-center px-4 py-10">
      <div class="panel w-full max-w-md p-8">
        <p class="text-center text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
          Novo acesso
        </p>
        <h1 class="mt-2 text-center text-3xl font-bold text-stone-950">Criar conta</h1>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div>
            <label for="nome" class="form-label">Nome completo</label>
            <input type="text" id="nome" formControlName="nome" class="form-control" placeholder="Seu nome" />
            <div *ngIf="isFieldInvalid('nome')" class="mt-1 text-sm text-red-700">
              Nome é obrigatório.
            </div>
          </div>

          <div>
            <label for="email" class="form-label">E-mail</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="form-control"
              placeholder="seu@email.com"
            />
            <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-red-700">
                Informe um e-mail válido.
            </div>
          </div>

          <div>
            <label for="senha" class="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              formControlName="senha"
              class="form-control"
                placeholder="Mínimo 6 caracteres"
            />
            <div *ngIf="isFieldInvalid('senha')" class="mt-1 text-sm text-red-700">
              Senha deve ter no mínimo 6 caracteres.
            </div>
          </div>

          <button type="submit" [disabled]="isLoading()" class="btn-primary w-full">
            {{ isLoading() ? 'Criando conta...' : 'Criar conta' }}
          </button>
        </form>

        <p class="mt-6 text-center text-stone-600">
          Já tem conta?
          <a routerLink="/login" class="text-link">Faça login</a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private notifications = inject(NotificationService);

  registerForm: FormGroup;
  isLoading = signal(false);

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

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.notifications.warning('Revise os campos obrigatórios.');
      return;
    }

    this.isLoading.set(true);

    this.authService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.notifications.success(response.message);
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.notifications.error(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.registerForm.get(field);
    return !!(formField && formField.invalid && formField.touched);
  }
}
