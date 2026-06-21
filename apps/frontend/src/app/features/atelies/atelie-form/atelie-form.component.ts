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

@Component({
  selector: 'app-atelie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm mb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <a routerLink="/atelies" class="text-blue-600 hover:underline">&larr; Voltar</a>
        </div>
      </nav>

      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">
          {{ isEditing() ? 'Editar Atelie' : 'Novo Atelie' }}
        </h1>

        <div *ngIf="success()" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {{ success() }}
        </div>

        <div *ngIf="error()" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {{ error() }}
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="bg-white p-8 rounded-lg shadow space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Especialidade / era</label>
            <input
              type="text"
              formControlName="especialidadeEra"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div *ngIf="fieldMessage('especialidadeEra')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('especialidadeEra') }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Data de fundacao</label>
            <input
              type="date"
              formControlName="dataFundacao"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div *ngIf="fieldMessage('dataFundacao')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('dataFundacao') }}
            </div>
          </div>

          <label class="flex items-center gap-3 text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              formControlName="equipadoCompleto"
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Equipado completo
          </label>
          <div *ngIf="fieldMessage('equipadoCompleto')" class="text-red-600 text-sm -mt-4">
            {{ fieldMessage('equipadoCompleto') }}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Area da oficina (m2)</label>
            <input
              type="number"
              formControlName="areaOficinaM2"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div *ngIf="fieldMessage('areaOficinaM2')" class="text-red-600 text-sm mt-1">
              {{ fieldMessage('areaOficinaM2') }}
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
              routerLink="/atelies"
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
export class AtelieFormComponent {
  form: FormGroup;
  isLoading = signal(false);
  isEditing = signal(false);
  error = signal('');
  success = signal('');
  fieldErrors = signal<FieldErrors>({});
  private apiUrl = `${environment.apiUrl}/atelies`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.form = this.fb.group({
      especialidadeEra: ['', [Validators.required]],
      dataFundacao: ['', [Validators.required]],
      equipadoCompleto: [false],
      areaOficinaM2: [50, [Validators.required]],
    });

    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditing.set(true);
        this.loadAtelie(params['id']);
      }
    });
  }

  loadAtelie(id: number) {
    this.isLoading.set(true);
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (data: any) => {
        this.form.patchValue(data);
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
      areaOficinaM2: Number(this.form.value.areaOficinaM2),
    };
    const id = this.route.snapshot.params['id'];
    const request = this.isEditing()
      ? this.http.patch(`${this.apiUrl}/${id}`, payload)
      : this.http.post(this.apiUrl, payload);

    request.subscribe({
      next: () => {
        this.success.set('Atelie salvo com sucesso.');
        this.router.navigate(['/atelies']);
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
