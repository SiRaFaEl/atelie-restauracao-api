import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Ateliê Restauração</h1>
          <div class="flex items-center gap-4">
            <span class="text-gray-700">Bem-vindo, <strong>{{ userName() }}</strong></span>
            <button
              (click)="logout()"
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Atelies</h3>
            <p class="text-gray-600 mb-4">Gerenciar atelies de restauração</p>
            <a
              routerLink="/atelies"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Acessar
            </a>
          </div>

          <div class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Projetos de Móveis</h3>
            <p class="text-gray-600 mb-4">Gerenciar projetos de móveis</p>
            <a
              routerLink="/projetos"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Acessar
            </a>
          </div>

          <div *ngIf="isAdmin()" class="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Usuários</h3>
            <p class="text-gray-600 mb-4">Gerenciar usuários do sistema</p>
            <a
              routerLink="/admin/users"
              class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Acessar
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  constructor(private authService: AuthService) {}

  userName = computed(() => this.authService.user()?.nome || 'Usuário');

  isAdmin() {
    return this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
}
