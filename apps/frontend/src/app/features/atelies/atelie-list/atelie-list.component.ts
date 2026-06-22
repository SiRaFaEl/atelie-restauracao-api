import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getApiErrorMessage } from '../../../core/api-error';
import { ConfirmModalComponent } from '../../../core/components/confirm-modal/confirm-modal.component';
import { NotificationService } from '../../../core/services/notification.service';

interface Atelie {
  id: number;
  especialidadeEra: string;
  dataFundacao: string;
  equipadoCompleto: boolean;
  areaOficinaM2: number;
}

@Component({
  selector: 'app-atelie-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmModalComponent],
  template: `
    <div class="app-shell">
      <nav class="app-nav">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a routerLink="/dashboard" class="text-link">&larr; Voltar ao painel</a>
          <span class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Atelies
          </span>
        </div>
      </nav>

      <main class="page-wrap">
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
              Oficinas cadastradas
            </p>
            <h1 class="mt-2 text-3xl font-bold text-stone-950">Atelies de restauracao</h1>
            <p class="mt-2 max-w-2xl text-stone-600">
              Organize especialidades, estrutura e capacidade de cada oficina.
            </p>
          </div>
          <a routerLink="/atelies/novo" class="btn-primary">+ Novo atelie</a>
        </div>

        <div *ngIf="isLoading()" class="panel p-8 text-center">
          <p class="text-stone-600">Carregando atelies...</p>
        </div>

        <div *ngIf="!isLoading() && atelies().length === 0 && !error()" class="panel p-8 text-center">
          <p class="text-stone-600">
            Nenhum atelie cadastrado.
            <a routerLink="/atelies/novo" class="text-link">Criar novo</a>
          </p>
        </div>

        <div *ngIf="atelies().length > 0" class="panel overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="table-head">
                <tr>
                  <th class="px-6 py-3 text-left">Especialidade</th>
                  <th class="px-6 py-3 text-left">Fundacao</th>
                  <th class="px-6 py-3 text-left">Equipado</th>
                  <th class="px-6 py-3 text-left">Area</th>
                  <th class="px-6 py-3 text-right">Acoes</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-amber-900/10">
                <tr *ngFor="let atelie of atelies()" class="transition hover:bg-amber-50/60">
                  <td class="px-6 py-4 text-sm font-semibold text-stone-950">
                    {{ atelie.especialidadeEra }}
                  </td>
                  <td class="px-6 py-4 text-sm text-stone-600">
                    {{ atelie.dataFundacao | date: 'dd/MM/yyyy' }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <span
                      class="status-pill"
                      [class.bg-emerald-100]="atelie.equipadoCompleto"
                      [class.text-emerald-900]="atelie.equipadoCompleto"
                      [class.bg-stone-100]="!atelie.equipadoCompleto"
                      [class.text-stone-700]="!atelie.equipadoCompleto"
                    >
                      {{ atelie.equipadoCompleto ? 'Sim' : 'Nao' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-stone-600">{{ atelie.areaOficinaM2 }} m2</td>
                  <td class="px-6 py-4 text-right text-sm">
                    <a [routerLink]="['/atelies/editar', atelie.id]" class="text-link">Editar</a>
                    <button
                      type="button"
                      (click)="askDeleteAtelie(atelie.id)"
                      class="ml-4 font-semibold text-red-700 hover:text-red-800 hover:underline"
                    >
                      Deletar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <app-confirm-modal
        [open]="pendingDeleteId() !== null"
        title="Remover atelie"
        message="Esta acao remove o atelie selecionado. Deseja continuar?"
        confirmLabel="Remover"
        cancelLabel="Cancelar"
        (confirm)="confirmDeleteAtelie()"
        (cancel)="pendingDeleteId.set(null)"
      />
    </div>
  `,
})
export class AtelieListComponent {
  private notifications = inject(NotificationService);

  atelies = signal<Atelie[]>([]);
  isLoading = signal(true);
  error = signal('');
  pendingDeleteId = signal<number | null>(null);
  private apiUrl = `${environment.apiUrl}/atelies`;

  constructor(private http: HttpClient) {
    this.loadAtelies();
  }

  loadAtelies(): void {
    this.isLoading.set(true);
    this.error.set('');
    this.http.get<Atelie[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.atelies.set(data);
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

  askDeleteAtelie(id: number): void {
    this.pendingDeleteId.set(id);
  }

  confirmDeleteAtelie(): void {
    const id = this.pendingDeleteId();
    if (id === null) {
      return;
    }

    this.error.set('');
    this.pendingDeleteId.set(null);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.notifications.success('Atelie removido com sucesso.');
        this.loadAtelies();
      },
      error: (err) => {
        const message = getApiErrorMessage(err);
        this.error.set(message);
        this.notifications.error(message);
      },
    });
  }
}
