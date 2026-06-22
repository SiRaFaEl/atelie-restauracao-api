import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getApiErrorMessage } from '../../../core/api-error';
import { NotificationService } from '../../../core/services/notification.service';

interface User {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  role: string;
  criadoEm: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="app-shell">
      <nav class="app-nav">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a routerLink="/dashboard" class="text-link">&larr; Voltar ao painel</a>
          <span class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Usuarios
          </span>
        </div>
      </nav>

      <main class="page-wrap">
        <div class="mb-8">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Administracao
          </p>
          <h1 class="mt-2 text-3xl font-bold text-stone-950">Gerenciamento de usuarios</h1>
          <p class="mt-2 text-stone-600">Ative ou desative acessos do sistema.</p>
        </div>

        <div *ngIf="isLoading()" class="panel p-8 text-center">
          <p class="text-stone-600">Carregando usuarios...</p>
        </div>

        <div *ngIf="users().length > 0" class="panel overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="table-head">
                <tr>
                  <th class="px-6 py-3 text-left">Nome</th>
                  <th class="px-6 py-3 text-left">E-mail</th>
                  <th class="px-6 py-3 text-left">Role</th>
                  <th class="px-6 py-3 text-left">Status</th>
                  <th class="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-amber-900/10">
                <tr *ngFor="let user of users()" class="transition hover:bg-amber-50/60">
                  <td class="px-6 py-4 text-sm font-semibold text-stone-950">{{ user.nome }}</td>
                  <td class="px-6 py-4 text-sm text-stone-600">{{ user.email }}</td>
                  <td class="px-6 py-4 text-sm text-stone-600">
                    <span
                      class="status-pill"
                      [class.bg-amber-100]="user.role === 'admin'"
                      [class.text-amber-950]="user.role === 'admin'"
                      [class.bg-stone-100]="user.role !== 'admin'"
                      [class.text-stone-700]="user.role !== 'admin'"
                    >
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <span
                      class="status-pill"
                      [class.bg-emerald-100]="user.ativo"
                      [class.text-emerald-900]="user.ativo"
                      [class.bg-red-100]="!user.ativo"
                      [class.text-red-900]="!user.ativo"
                    >
                      {{ user.ativo ? 'Ativo' : 'Inativo' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right text-sm">
                    <button
                      type="button"
                      (click)="toggleUserActive(user.id)"
                      [disabled]="togglingIds().includes(user.id)"
                      class="font-semibold text-amber-900 transition hover:text-amber-700 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {{ user.ativo ? 'Desativar' : 'Ativar' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div *ngIf="!isLoading() && users().length === 0 && !error()" class="panel p-8 text-center">
          <p class="text-stone-600">Nenhum usuario encontrado.</p>
        </div>
      </main>
    </div>
  `,
})
export class UserListComponent {
  private notifications = inject(NotificationService);

  users = signal<User[]>([]);
  isLoading = signal(true);
  error = signal('');
  togglingIds = signal<string[]>([]);
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.error.set('');
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        const message = getApiErrorMessage(err);
        this.error.set(message);
        this.notifications.error(message);
        this.isLoading.set(false);
      },
    });
  }

  toggleUserActive(userId: string): void {
    const currentToggling = this.togglingIds();
    this.togglingIds.set([...currentToggling, userId]);

    this.http.patch(`${this.apiUrl}/${userId}/activate`, {}).subscribe({
      next: () => {
        this.notifications.success('Status do usuario atualizado.');
        this.loadUsers();
        this.togglingIds.set(this.togglingIds().filter((id) => id !== userId));
      },
      error: (err) => {
        const message = getApiErrorMessage(err);
        this.error.set(message);
        this.notifications.error(message);
        this.togglingIds.set(this.togglingIds().filter((id) => id !== userId));
      },
    });
  }
}
