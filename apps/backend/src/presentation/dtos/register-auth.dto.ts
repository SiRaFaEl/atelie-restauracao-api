import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, {
    message: 'Informe um e-mail com domínio válido',
  })
  @IsNotEmpty({ message: 'E-mail é obrigatório' })
  email: string;

  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha: string;
}
