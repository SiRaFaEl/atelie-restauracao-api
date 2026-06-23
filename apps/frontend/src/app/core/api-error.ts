import { HttpErrorResponse } from '@angular/common/http';

export type FieldErrors = Record<string, string[]>;

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse && error.status === 0) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
  }

  if (error instanceof HttpErrorResponse) {
    const message = error.error?.message;
    if (Array.isArray(message)) {
      return message.join(' ');
    }
    if (typeof message === 'string' && message.trim()) {
      return message;
    }
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
}

export function getApiFieldErrors(error: unknown): FieldErrors {
  if (error instanceof HttpErrorResponse && error.error?.errors) {
    return error.error.errors as FieldErrors;
  }

  return {};
}
