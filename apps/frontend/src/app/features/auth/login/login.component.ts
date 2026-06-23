import { Component, inject, signal } from '@angular/core';
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
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="app-shell flex items-center justify-center px-4 py-10">
      <div class="grid w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-[0_24px_65px_rgba(73,45,24,0.18)] lg:grid-cols-[1fr_0.9fr]">
        <section class="hidden bg-amber-950 p-10 text-amber-50 lg:block">
          <p class="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">
            Ateliê Restauração
          </p>
          <h1 class="mt-5 text-4xl font-bold leading-tight">
            Gestão feita para quem devolve vida aos móveis.
          </h1>
          <p class="mt-5 text-amber-100">
            Controle oficinas, projetos e horas de trabalho em uma rotina visualmente mais acolhedora.
          </p>
        </section>

        <section class="p-8 sm:p-10">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Acesso
          </p>
          <h2 class="mt-2 text-3xl font-bold text-stone-950">Entrar no sistema</h2>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
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
                placeholder="Sua senha"
              />
              <div *ngIf="isFieldInvalid('senha')" class="mt-1 text-sm text-red-700">
                Senha é obrigatória.
              </div>
              <div class="mt-2 text-right">
                <button
                  type="button"
                  (click)="showPasswordRecoveryInfo()"
                  class="text-link text-sm"
                >
                  Esqueci minha senha
                </button>
              </div>
            </div>

            <button type="submit" [disabled]="isLoading()" class="btn-primary w-full">
              {{ isLoading() ? 'Entrando...' : 'Entrar' }}
            </button>
          </form>

          <p class="mt-6 text-center text-stone-600">
            Não tem conta?
            <a routerLink="/register" class="text-link">Cadastre-se aqui</a>
          </p>
        </section>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private notifications = inject(NotificationService);

  loginForm: FormGroup;
  isLoading = signal(false);

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

    const message = this.route.snapshot.queryParamMap.get('message');
    if (message) {
      this.notifications.info(message);
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.notifications.warning('Informe e-mail e senha para entrar.');
      return;
    }

    this.isLoading.set(true);

    const { email, senha } = this.loginForm.value;
    this.authService.login(email, senha).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.notifications.error(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const formField = this.loginForm.get(field);
    return !!(formField && formField.invalid && formField.touched);
  }

  showPasswordRecoveryInfo(): void {
    this.notifications.info(
      'Recuperação de senha em desenvolvimento. Entre em contato com o administrador.',
    );
  }
}
