import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="app-shell">
      <nav class="app-nav">
        <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-amber-900/70">
              Gestao de oficina
            </p>
            <h1 class="mt-1 text-2xl font-bold text-stone-950">Atelie Restauracao</h1>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-sm text-stone-700">
              Bem-vindo, <strong>{{ userName() }}</strong>
            </span>
            <button type="button" (click)="logout()" class="btn-danger">Sair</button>
          </div>
        </div>
      </nav>

      <main class="page-wrap">
        <section class="mb-8 overflow-hidden rounded-lg bg-amber-950 text-amber-50 shadow-[0_24px_55px_rgba(73,45,24,0.20)]">
          <div class="grid gap-8 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.28em] text-amber-200">
                Madeira, historia e cuidado
              </p>
              <h2 class="mt-4 max-w-3xl text-4xl font-bold">
                Controle cada restauracao, do diagnostico ao acabamento.
              </h2>
              <p class="mt-4 max-w-2xl text-amber-100">
                Centralize atelies, projetos, prazos e horas de trabalho com uma interface mais clara para rotina de oficina.
              </p>
            </div>
            <div class="rounded-lg border border-amber-200/20 bg-white/10 p-6">
              <p class="text-sm uppercase tracking-[0.24em] text-amber-200">Fluxo rapido</p>
              <div class="mt-5 space-y-3 text-sm text-amber-50">
                <p>1. Cadastre a oficina responsavel.</p>
                <p>2. Abra o projeto do movel.</p>
                <p>3. Atualize status e horas ate finalizar.</p>
              </div>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article class="panel p-6 transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(73,45,24,0.14)]">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-900/70">Oficinas</p>
            <h3 class="mt-3 text-xl font-bold text-stone-950">Atelies</h3>
            <p class="mt-3 text-stone-600">Gerencie especialidades, estrutura e capacidade dos atelies.</p>
            <a routerLink="/atelies" class="btn-primary mt-6">Acessar</a>
          </article>

          <article class="panel p-6 transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(73,45,24,0.14)]">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-900/70">Pecas</p>
            <h3 class="mt-3 text-xl font-bold text-stone-950">Projetos de moveis</h3>
            <p class="mt-3 text-stone-600">Acompanhe moveis em restauracao, horas investidas e status.</p>
            <a routerLink="/projetos" class="btn-primary mt-6">Acessar</a>
          </article>

          <article
            *ngIf="isAdmin()"
            class="panel p-6 transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(73,45,24,0.14)]"
          >
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-amber-900/70">Acesso</p>
            <h3 class="mt-3 text-xl font-bold text-stone-950">Usuarios</h3>
            <p class="mt-3 text-stone-600">Controle usuarios autorizados no sistema.</p>
            <a routerLink="/admin/users" class="btn-secondary mt-6">Acessar</a>
          </article>
        </div>
      </main>
    </div>
  `,
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  userName = computed(() => this.authService.user()?.nome || 'Usuario');

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}
