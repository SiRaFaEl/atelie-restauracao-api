import { Component, inject, signal } from '@angular/core';
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
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-atelie-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="app-shell">
      <nav class="app-nav">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <a routerLink="/atelies" class="text-link">&larr; Voltar para atelies</a>
        </div>
      </nav>

      <main class="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="mb-8">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Oficina de restauracao
          </p>
          <h1 class="mt-2 text-3xl font-bold text-stone-950">
            {{ isEditing() ? 'Editar atelie' : 'Novo atelie' }}
          </h1>
          <p class="mt-2 text-stone-600">
            Cadastre especialidade, fundacao e estrutura disponivel para restaurar moveis.
          </p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="panel space-y-6 p-8">
          <div>
            <label class="form-label">Especialidade / era</label>
            <input
              type="text"
              formControlName="especialidadeEra"
              class="form-control"
              placeholder="Ex.: moveis coloniais, art deco"
            />
            <div *ngIf="fieldMessage('especialidadeEra')" class="mt-1 text-sm text-red-700">
              {{ fieldMessage('especialidadeEra') }}
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label class="form-label">Data de fundacao</label>
              <input type="date" formControlName="dataFundacao" class="form-control" />
              <div *ngIf="fieldMessage('dataFundacao')" class="mt-1 text-sm text-red-700">
                {{ fieldMessage('dataFundacao') }}
              </div>
            </div>

            <div>
              <label class="form-label">Area da oficina (m2)</label>
              <input type="number" formControlName="areaOficinaM2" class="form-control" />
              <div *ngIf="fieldMessage('areaOficinaM2')" class="mt-1 text-sm text-red-700">
                {{ fieldMessage('areaOficinaM2') }}
              </div>
            </div>
          </div>

          <label class="flex items-center gap-3 rounded-lg border border-amber-900/10 bg-amber-50/70 px-4 py-3 text-sm font-semibold text-stone-700">
            <input
              type="checkbox"
              formControlName="equipadoCompleto"
              class="h-4 w-4 rounded border-amber-900/30 text-amber-800 focus:ring-amber-700"
            />
            Equipado completo
          </label>

          <div class="flex flex-col-reverse gap-3 sm:flex-row">
            <a routerLink="/atelies" class="btn-secondary flex-1">Cancelar</a>
            <button type="submit" [disabled]="isLoading()" class="btn-primary flex-1">
              {{ isLoading() ? 'Salvando...' : 'Salvar atelie' }}
            </button>
          </div>
        </form>
      </main>
    </div>
  `,
})
export class AtelieFormComponent {
  private notifications = inject(NotificationService);

  form: FormGroup;
  isLoading = signal(false);
  isEditing = signal(false);
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

  loadAtelie(id: number): void {
    this.isLoading.set(true);
    this.http.get(`${this.apiUrl}/${id}`).subscribe({
      next: (data: any) => {
        this.form.patchValue(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.notifications.error(getApiErrorMessage(err));
        this.isLoading.set(false);
      },
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notifications.warning('Revise os campos obrigatorios.');
      return;
    }

    this.isLoading.set(true);
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
        this.notifications.success('Atelie salvo com sucesso.');
        this.router.navigate(['/atelies']);
      },
      error: (err) => {
        this.notifications.error(getApiErrorMessage(err));
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
