import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { getApiErrorMessage } from '../../../core/api-error';

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
          <h1 class="text-3xl font-bold text-gray-900">Atelies</h1>
          <a
            routerLink="/atelies/novo"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            + Novo Atelie
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

        <div *ngIf="!isLoading() && atelies().length === 0 && !error()" class="bg-white p-8 rounded-lg shadow text-center">
          <p class="text-gray-600">Nenhum atelie cadastrado. <a routerLink="/atelies/novo" class="text-blue-600 hover:underline">Criar novo</a></p>
        </div>

        <div *ngIf="atelies().length > 0" class="bg-white rounded-lg shadow overflow-hidden">
          <table class="min-w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Especialidade</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fundacao</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Equipado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Area</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acoes</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr *ngFor="let atelie of atelies()" class="hover:bg-gray-50">
                <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ atelie.especialidadeEra }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ atelie.dataFundacao | date: 'dd/MM/yyyy' }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ atelie.equipadoCompleto ? 'Sim' : 'Nao' }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ atelie.areaOficinaM2 }} m2</td>
                <td class="px-6 py-4 text-right text-sm space-x-2">
                  <a
                    [routerLink]="['/atelies/editar', atelie.id]"
                    class="text-blue-600 hover:underline"
                  >
                    Editar
                  </a>
                  <button
                    (click)="deleteAtelie(atelie.id)"
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
export class AtelieListComponent {
  atelies = signal<Atelie[]>([]);
  isLoading = signal(true);
  error = signal('');
  message = signal('');
  private apiUrl = `${environment.apiUrl}/atelies`;

  constructor(private http: HttpClient) {
    this.loadAtelies();
  }

  loadAtelies() {
    this.isLoading.set(true);
    this.error.set('');
    this.http.get<Atelie[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.atelies.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  deleteAtelie(id: number) {
    if (!confirm('Tem certeza que deseja deletar este atelie?')) {
      return;
    }

    this.error.set('');
    this.message.set('');
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this.message.set('Atelie removido com sucesso.');
        this.loadAtelies();
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
      },
    });
  }
}
