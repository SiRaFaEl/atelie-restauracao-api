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

interface Atelie {
  id: number;
  especialidadeEra: string;
}

@Component({
  selector: 'app-projeto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="app-shell">
      <nav class="app-nav">
        <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <a routerLink="/projetos" class="text-link">&larr; Voltar para projetos</a>
        </div>
      </nav>

      <main class="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div class="mb-8">
          <p class="text-sm font-semibold uppercase tracking-[0.24em] text-amber-900/70">
            Projeto de restauracao
          </p>
          <h1 class="mt-2 text-3xl font-bold text-stone-950">
            {{ isEditing() ? 'Editar projeto' : 'Novo projeto' }}
          </h1>
          <p class="mt-2 text-stone-600">
            Registre a peca, a oficina responsavel e o tempo previsto de trabalho.
          </p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="panel space-y-6 p-8">
          <div>
            <label class="form-label">Tipo do movel</label>
            <input type="text" formControlName="tipoMovel" class="form-control" placeholder="Ex.: cadeira colonial" />
            <div *ngIf="fieldMessage('tipoMovel')" class="mt-1 text-sm text-red-700">
              {{ fieldMessage('tipoMovel') }}
            </div>
          </div>

          <div>
            <label class="form-label">Atelie</label>
            <select formControlName="atelieId" class="form-control">
              <option value="">Selecione um atelie</option>
              <option *ngFor="let atelie of atelies()" [value]="atelie.id">
                {{ atelie.especialidadeEra }}
              </option>
            </select>
            <div *ngIf="fieldMessage('atelieId')" class="mt-1 text-sm text-red-700">
              {{ fieldMessage('atelieId') }}
            </div>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div>
              <label class="form-label">Data de inicio</label>
              <input type="date" formControlName="dataInicioTrab" class="form-control" />
              <div *ngIf="fieldMessage('dataInicioTrab')" class="mt-1 text-sm text-red-700">
                {{ fieldMessage('dataInicioTrab') }}
              </div>
            </div>

            <div>
              <label class="form-label">Horas-homem</label>
              <input type="number" formControlName="horasHomem" class="form-control" />
              <div *ngIf="fieldMessage('horasHomem')" class="mt-1 text-sm text-red-700">
                {{ fieldMessage('horasHomem') }}
              </div>
            </div>
          </div>

          <label class="flex items-center gap-3 rounded-lg border border-amber-900/10 bg-amber-50/70 px-4 py-3 text-sm font-semibold text-stone-700">
            <input
              type="checkbox"
              formControlName="restaurado"
              class="h-4 w-4 rounded border-amber-900/30 text-amber-800 focus:ring-amber-700"
            />
            Movel restaurado
          </label>

          <div class="flex flex-col-reverse gap-3 sm:flex-row">
            <a routerLink="/projetos" class="btn-secondary flex-1">Cancelar</a>
            <button type="submit" [disabled]="isLoading()" class="btn-primary flex-1">
              {{ isLoading() ? 'Salvando...' : 'Salvar projeto' }}
            </button>
          </div>
        </form>
      </main>
    </div>
  `,
})
export class ProjetoFormComponent {
  private notifications = inject(NotificationService);

  form: FormGroup;
  isLoading = signal(false);
  isEditing = signal(false);
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

  loadAtelies(): void {
    this.http.get<Atelie[]>(this.atelieUrl).subscribe({
      next: (data) => {
        this.atelies.set(data);
      },
      error: (err) => {
        this.notifications.error(getApiErrorMessage(err));
      },
    });
  }

  loadProjeto(id: number): void {
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
      atelieId: Number(this.form.value.atelieId),
      horasHomem: Number(this.form.value.horasHomem),
    };
    const id = this.route.snapshot.params['id'];
    const request = this.isEditing()
      ? this.http.patch(`${this.apiUrl}/${id}`, payload)
      : this.http.post(this.apiUrl, payload);

    request.subscribe({
      next: () => {
        this.notifications.success('Projeto salvo com sucesso.');
        this.router.navigate(['/projetos']);
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
