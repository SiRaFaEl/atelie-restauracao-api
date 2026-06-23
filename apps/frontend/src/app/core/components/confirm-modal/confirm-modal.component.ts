import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (open) {
      <div
        class="fixed inset-0 z-40 flex items-center justify-center bg-stone-950/55 px-4 backdrop-blur-sm"
        (click)="onBackdrop($event)"
      >
        <div
          class="w-full max-w-md rounded-lg border border-amber-900/10 bg-white p-6 shadow-2xl"
          role="dialog"
          aria-modal="true"
        >
          <h2 class="mb-2 text-lg font-semibold text-stone-950">{{ title }}</h2>
          <p class="mb-6 text-sm leading-6 text-stone-600">{{ message }}</p>
          <div class="flex justify-end gap-3">
            <button type="button" (click)="cancel.emit()" class="btn-secondary">
              {{ cancelLabel }}
            </button>
            <button
              type="button"
              (click)="confirm.emit()"
              [class.btn-danger]="variant === 'danger'"
              [class.btn-primary]="variant !== 'danger'"
            >
              {{ confirmLabel }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmModalComponent {
  @Input() open = false;
  @Input() title = 'Confirmar ação';
  @Input() message = 'Tem certeza que deseja continuar?';
  @Input() confirmLabel = 'Confirmar';
  @Input() cancelLabel = 'Cancelar';
  @Input() variant: 'danger' | 'primary' = 'danger';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onBackdrop(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancel.emit();
    }
  }
}
