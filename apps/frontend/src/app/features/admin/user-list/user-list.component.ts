import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getApiErrorMessage } from '../../../core/api-error';

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
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a routerLink="/dashboard" class="text-blue-600 hover:underline">&larr; Voltar</a>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Gerenciamento de Usuários</h1>

        <div *ngIf="isLoading()" class="bg-white p-8 rounded-lg shadow text-center">
          <p class="text-gray-600">Carregando...</p>
        </div>

        <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {{ error() }}
        </div>

        <div *ngIf="users().length > 0" class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">E-mail</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr *ngFor="let user of users()" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ user.nome }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">
                  <span [class]="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'" class="px-2 py-1 rounded text-xs">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-sm">
                  <span [class]="user.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" class="px-2 py-1 rounded text-xs">
                    {{ user.ativo ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-sm">
                  <button
                    (click)="toggleUserActive(user.id)"
                    [disabled]="togglingIds().includes(user.id)"
                    [class.opacity-50]="togglingIds().includes(user.id)"
                    class="text-blue-600 hover:underline"
                  >
                    {{ user.ativo ? 'Desativar' : 'Ativar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div *ngIf="!isLoading() && users().length === 0 && !error()" class="bg-white p-8 rounded-lg shadow text-center">
          <p class="text-gray-600">Nenhum usuário encontrado</p>
        </div>
      </div>
    </div>
  `,
})
export class UserListComponent {
  users = signal<User[]>([]);
  isLoading = signal(true);
  error = signal('');
  togglingIds = signal<string[]>([]);
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading.set(true);
    this.error.set('');
    this.http.get<User[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  toggleUserActive(userId: string) {
    const currentToggling = this.togglingIds();
    this.togglingIds.set([...currentToggling, userId]);

    this.http.patch(`${this.apiUrl}/${userId}/activate`, {}).subscribe({
      next: () => {
        this.loadUsers();
        this.togglingIds.set(this.togglingIds().filter((id) => id !== userId));
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.togglingIds.set(this.togglingIds().filter((id) => id !== userId));
      },
    });
  }
}
