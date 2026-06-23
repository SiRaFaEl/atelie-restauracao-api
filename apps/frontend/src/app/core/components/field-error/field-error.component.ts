import { Component, Input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { getApiFieldErrors } from '../../api-error';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (message()) {
      <p class="text-red-600 text-sm mt-1">{{ message() }}</p>
    }
  `,
})
export class FieldErrorComponent {
  /** O controle do Reactive Form. */
  @Input({ required: true }) control!: AbstractControl | null;

  /** Erros retornados pelo backend (mapa campo -> lista de mensagens). */
  @Input() fieldErrors: Record<string, string[]> | null = {};

  /** Nome do campo nas mensagens de erro do backend. */
  @Input() fieldName = '';

  /** Mensagem customizada para erro `required`. */
  @Input() requiredMessage = 'Campo obrigatório.';

  message = computed(() => {
    const apiErrors = this.fieldErrors ?? {};
    const fromApi = (this.fieldName ? apiErrors[this.fieldName] : undefined)?.[0];
    if (fromApi) {
      return fromApi;
    }

    const ctrl = this.control;
    if (!ctrl || !ctrl.touched) {
      return '';
    }
    if (ctrl.hasError('required')) {
      return this.requiredMessage;
    }
    if (ctrl.hasError('email')) {
      return 'Informe um e-mail válido.';
    }
    if (ctrl.hasError('minlength')) {
      const min = ctrl.getError('minlength')?.requiredLength;
      return `Mínimo de ${min ?? 0} caracteres.`;
    }
    return '';
  });
}
