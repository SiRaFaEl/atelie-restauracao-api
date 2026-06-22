import { Injectable, signal } from '@angular/core';

export type NotificationKind = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  kind: NotificationKind;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _items = signal<Notification[]>([]);
  private nextId = 1;

  /** Lista de notificações ativas (reativa). */
  readonly items = this._items.asReadonly();

  show(message: string, kind: NotificationKind = 'info', durationMs = 5000): void {
    const id = this.nextId++;
    this._items.update((list) => [...list, { id, kind, message }]);
    if (durationMs > 0) {
      setTimeout(() => this.dismiss(id), durationMs);
    }
  }

  success(message: string): void {
    this.show(message, 'success');
  }

  error(message: string): void {
    // Erros ficam mais tempo na tela para o usuário ler.
    this.show(message, 'error', 7000);
  }

  warning(message: string): void {
    this.show(message, 'warning', 6000);
  }

  info(message: string): void {
    this.show(message, 'info');
  }

  dismiss(id: number): void {
    this._items.update((list) => list.filter((n) => n.id !== id));
  }
}
