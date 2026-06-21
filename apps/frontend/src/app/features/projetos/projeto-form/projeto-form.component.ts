import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import {
  FieldErrors,
  getApiErrorMessage,
  getApiFieldErrors,
} from '../../../core/api-error';

interface Atelie {
  id: number;
  especialidadeEra: string;
}

@Component({
  selector: 'app-projeto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a routerLink="/projetos" class="text-blue-600 hover:underline">&larr; Voltar</a>
        </div>
      </nav>

      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">
          {{ isEditing() ? 'Editar Projeto' : 'Novo Projeto' }}
        </h1>

        <div *ngIf="success()" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {{ success() }}
        </div>

        <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {{ error() }}
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white p-8 rounded-lg shadow space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Tipo do movel</label>
            <input
              type="text"
              formControlName="tipoMovel"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div *ngIf="fieldMessage('tipoMovel')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('tipoMovel') }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Atelie</label>
            <select
              formControlName="atelieId"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione um atelie</option>
              <option *ngFor="let atelie of atelies()" [value]="atelie.id">
                {{ atelie.especialidadeEra }}
              </option>
            </select>
            <div *ngIf="fieldMessage('atelieId')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('atelieId') }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Data de inicio do trabalho</label>
            <input
              type="date"
              formControlName="dataInicioTrab"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div *ngIf="fieldMessage('dataInicioTrab')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('dataInicioTrab') }}
            </div>
          </div>

          <label class="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              formControlName="restaurado"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Restaurado
          </label>
          <div *ngIf="fieldMessage('restaurado')" class="text-red-600 text-sm -mt-4">
            {{ fieldMessage('restaurado') }}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Horas-homem</label>
            <input
              type="number"
              formControlName="horasHomem"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div *ngIf="fieldMessage('horasHomem')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('horasHomem') }}
            </div>
          </div>

          <div class="flex gap-4">
            <button
              type="submit"
              [disabled]="isLoading()"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg"
            >
              {{ isLoading() ? 'Salvando...' : 'Salvar' }}
            </button>
            <button
              type="button"
              routerLink="/projetos"
              class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-2 px-4 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class ProjetoFormComponent {
  form: FormGroup;
  isLoading = signal(false);
  isEditing = signal(false);
  error = signal('');
  success = signal('');
  fieldErrors = signal<FieldErrors>({});
  atelies = signal<Atelie[]>([]);
  private apiUrl = `${environment.apiUrl}/projetos`;
  private atelieUrl = `${environment.apiUrl}/atelies`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      tipoMovel: ['', [Validators.required]],
      dataInicioTrab: ['', [Validators.required]],
      restaurado: [false],
      horasHomem: [10, [Validators.required]],
      atelieId: ['', [Validators.required]],
    });

    this.loadAtelies();

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing.set(true);
        this.loadProjeto(params['id']);
      }
    });
  }

  loadAtelies() {
    this.http.get<Atelie[]>(this.atelieUrl).subscribe({
      next: (data) => {
        this.atelies.set(data);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
      },
    });
  }

  loadProjeto(id: number) {
    this.isLoading.set(true);
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          tipoMovel: data.tipoMovel,
          dataInicioTrab: data.dataInicioTrab,
          restaurado: data.restaurado,
          horasHomem: data.horasHomem,
          atelieId: data.atelieId,
        });
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set('');
    this.success.set('');
    this.fieldErrors.set({});

    const payload = {
      ...this.form.value,
      atelieId: Number(this.form.value.atelieId),
      horasHomem: Number(this.form.value.horasHomem),
    };
    const id = this.route.snapshot.params['id'];
    const request = this.isEditing()
      ? this.http.patch(`${this.apiUrl}/${id}`, payload)
      : this.http.post(this.apiUrl, payload);

    request.subscribe({
      next: () => {
        this.success.set('Projeto salvo com sucesso.');
        this.router.navigate(['/projetos']);
      },
      error: (err) => {
        this.error.set(getApiErrorMessage(err));
        this.fieldErrors.set(getApiFieldErrors(err));
        this.isLoading.set(false);
      },
    });
  }

  fieldMessage(field: string): string {
    const apiMessage = this.fieldErrors()[field]?.[0];
    if (apiMessage) {
      return apiMessage;
    }

    const control = this.form.get(field);
    if (control?.hasError('required') && control.touched) {
      return 'Campo obrigatorio.';
    }

    return '';
  }
}
