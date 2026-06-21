import { HttpErrorResponse } from '@angular/common/http';

export type FieldErrors = Record<string, string[]>;

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse && error.status === 0) {
    return 'Nao foi possivel conectar ao servidor. Verifique sua conexao.';
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

  return 'Nao foi possivel concluir a operacao. Tente novamente.';
}

export function getApiFieldErrors(error: unknown): FieldErrors {
  if (error instanceof HttpErrorResponse && error.error?.errors) {
    return error.error.errors as FieldErrors;
  }

  return {};
}
