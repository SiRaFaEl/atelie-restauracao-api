import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getApiErrorMessage } from '../../../core/api-error';
import { ConfirmModalComponent } from '../../../core/components/confirm-modal/confirm-modal.component';
import { NotificationService } from '../../../core/services/notification.service';

interface Projeto {
  id: number;
  tipoMovel: string;
  dataInicioTrab: string;
  restaurado: boolean;
  horasHomem: number;
  atelieId: number;
  atelie?: {
    especialidadeEra: string;
  };
}

@Component({
  selector: 'app-projeto-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ConfirmModalComponent],
  template: `
    <div class="app-shell">
      <nav class="app-nav">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a routerLink="/dashboard" class="text-link">&larr; Voltar ao painel</a>
          <span class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Projetos
          </span>
        </div>
      </nav>

      <main class="page-wrap">
        <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
              Restauração de móveis
            </p>
            <h1 class="mt-2 text-3xl font-bold text-stone-950">Projetos em andamento</h1>
            <p class="mt-2 max-w-2xl text-stone-600">
              Acompanhe peças, horas de trabalho e status de restauração.
            </p>
          </div>
          <a routerLink="/projetos/novo" class="btn-primary">+ Novo projeto</a>
        </div>

        <div *ngIf="isLoading()" class="panel p-8 text-center">
          <p class="text-stone-600">Carregando projetos...</p>
        </div>

        <div *ngIf="!isLoading() && projetos().length === 0 && !error()" class="panel p-8 text-center">
          <p class="text-stone-600">
            Nenhum projeto cadastrado.
            <a routerLink="/projetos/novo" class="text-link">Criar novo</a>
          </p>
        </div>

        <div *ngIf="projetos().length > 0" class="panel overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead class="table-head">
                <tr>
                  <th class="px-6 py-3 text-left">Tipo</th>
                  <th class="px-6 py-3 text-left">Ateliê</th>
                  <th class="px-6 py-3 text-left">Início</th>
                  <th class="px-6 py-3 text-left">Status</th>
                  <th class="px-6 py-3 text-left">Horas</th>
                  <th class="px-6 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-amber-900/10">
                <tr *ngFor="let projeto of projetos()" class="transition hover:bg-amber-50/60">
                  <td class="px-6 py-4 text-sm font-semibold text-stone-950">{{ projeto.tipoMovel }}</td>
                  <td class="px-6 py-4 text-sm text-stone-600">
                    {{ projeto.atelie?.especialidadeEra || projeto.atelieId }}
                  </td>
                  <td class="px-6 py-4 text-sm text-stone-600">
                    {{ projeto.dataInicioTrab | date: 'dd/MM/yyyy' }}
                  </td>
                  <td class="px-6 py-4 text-sm">
                    <span
                      class="status-pill"
                      [class.bg-emerald-100]="projeto.restaurado"
                      [class.text-emerald-900]="projeto.restaurado"
                      [class.bg-amber-100]="!projeto.restaurado"
                      [class.text-amber-950]="!projeto.restaurado"
                    >
                      {{ projeto.restaurado ? 'Restaurado' : 'Em aberto' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-sm text-stone-600">{{ projeto.horasHomem }}h</td>
                  <td class="px-6 py-4 text-right text-sm">
                    <a [routerLink]="['/projetos/editar', projeto.id]" class="text-link">Editar</a>
                    <button
                      type="button"
                      (click)="askDeleteProjeto(projeto.id)"
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
        title="Remover projeto"
        message="Esta ação remove o projeto de restauração selecionado. Deseja continuar?"
        confirmLabel="Remover"
        cancelLabel="Cancelar"
        (confirm)="confirmDeleteProjeto()"
        (cancel)="pendingDeleteId.set(null)"
      />
    </div>
  `,
})
export class ProjetoListComponent {
  private notifications = inject(NotificationService);

  projetos = signal<Projeto[]>([]);
  isLoading = signal(true);
  error = signal('');
  pendingDeleteId = signal<number | null>(null);
  private apiUrl = `${environment.apiUrl}/projetos`;

  constructor(private http: HttpClient) {
    this.loadProjetos();
  }

  loadProjetos(): void {
    this.isLoading.set(true);
    this.error.set('');
    this.http.get<Projeto[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.projetos.set(data);
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

  askDeleteProjeto(id: number): void {
    this.pendingDeleteId.set(id);
  }

  confirmDeleteProjeto(): void {
    const id = this.pendingDeleteId();
    if (id === null) {
      return;
    }

    this.error.set('');
    this.pendingDeleteId.set(null);
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.notifications.success('Projeto removido com sucesso.');
        this.loadProjetos();
      },
      error: (err) => {
        const message = getApiErrorMessage(err);
        this.error.set(message);
        this.notifications.error(message);
      },
    });
  }
}
