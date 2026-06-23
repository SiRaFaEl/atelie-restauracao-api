import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a routerLink="/dashboard" class="text-2xl font-bold text-gray-900">
          Ateliê Restauração
        </a>
        <div class="flex items-center gap-4">
          <span class="text-gray-700">
            Olá, <strong>{{ userName() }}</strong>
          </span>
          <button
            type="button"
            (click)="logout()"
            class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  `,
})
export class PageHeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notifications = inject(NotificationService);

  userName = computed(() => this.authService.user()?.nome || 'Usuário');

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.notifications.info('Você saiu da sua conta.');
  }
}
