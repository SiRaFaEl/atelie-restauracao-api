import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getApiErrorMessage } from '../../../core/api-error';

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
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a routerLink="/dashboard" class="text-blue-600 hover:underline">&larr; Voltar</a>
        </div>
      </nav>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Projetos de Moveis</h1>
          <a
            routerLink="/projetos/novo"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + Novo Projeto
          </a>
        </div>

        <div *ngIf="isLoading()" class="bg-white p-8 rounded-lg shadow text-center">
          <p class="text-gray-600">Carregando...</p>
        </div>

        <div *ngIf="message()" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {{ message() }}
        </div>

        <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {{ error() }}
        </div>

        <div *ngIf="!isLoading() && projetos().length === 0 && !error()" class="bg-white p-8 rounded-lg shadow text-center">
          <p class="text-gray-600">Nenhum projeto cadastrado. <a routerLink="/projetos/novo" class="text-blue-600 hover:underline">Criar novo</a></p>
        </div>

        <div *ngIf="projetos().length > 0" class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Atelie</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Inicio</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horas</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acoes</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr *ngFor="let projeto of projetos()" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ projeto.tipoMovel }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ projeto.atelie?.especialidadeEra || projeto.atelieId }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ projeto.dataInicioTrab | date: 'dd/MM/yyyy' }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ projeto.restaurado ? 'Restaurado' : 'Em aberto' }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ projeto.horasHomem }}</td>
                <td class="px-6 py-4 text-right text-sm space-x-2">
                  <a
                    [routerLink]="['/projetos/editar', projeto.id]"
                    class="text-blue-600 hover:underline"
                  >
                    Editar
                  </a>
                  <button
                    (click)="deleteProjeto(projeto.id)"
                    class="text-red-600 hover:underline ml-4"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class ProjetoListComponent {
  projetos = signal<Projeto[]>([]);
  isLoading = signal(true);
  error = signal('');
  message = signal('');
  private apiUrl = `${environment.apiUrl}/projetos`;

  constructor(private http: HttpClient) {
    this.loadProjetos();
  }

  loadProjetos() {
    this.isLoading.set(true);
    this.error.set('');
    this.http.get<Projeto[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.projetos.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  deleteProjeto(id: number) {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) {
      return;
    }

    this.error.set('');
    this.message.set('');
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.message.set('Projeto removido com sucesso.');
        this.loadProjetos();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
      },
    });
  }
}
