import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast-host',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
      @for (item of notifications.items(); track item.id) {
        <div
          class="flex items-start gap-3 rounded-lg border px-4 py-3 shadow-xl backdrop-blur"
          [class.bg-emerald-50]="item.kind === 'success'"
          [class.border-emerald-200]="item.kind === 'success'"
          [class.text-emerald-900]="item.kind === 'success'"
          [class.bg-red-50]="item.kind === 'error'"
          [class.border-red-200]="item.kind === 'error'"
          [class.text-red-900]="item.kind === 'error'"
          [class.bg-sky-50]="item.kind === 'info'"
          [class.border-sky-200]="item.kind === 'info'"
          [class.text-sky-900]="item.kind === 'info'"
          [class.bg-amber-50]="item.kind === 'warning'"
          [class.border-amber-200]="item.kind === 'warning'"
          [class.text-amber-950]="item.kind === 'warning'"
        >
          <span class="flex-1 text-sm font-medium">{{ item.message }}</span>
          <button
            type="button"
            (click)="notifications.dismiss(item.id)"
            class="rounded px-1 text-current opacity-60 transition hover:bg-black/5 hover:opacity-100"
            aria-label="Fechar"
          >
            x
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastHostComponent {
  notifications = inject(NotificationService);
}
