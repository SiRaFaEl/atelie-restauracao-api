import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsBoolean, IsNumber } from 'class-validator';

export class CreateProjetoMovelDto {
  @ApiProperty()
  @IsString({ message: 'tipoMovel deve ser um texto.' })
  @IsNotEmpty({ message: 'tipoMovel é obrigatório.' })
  tipoMovel!: string;

  @ApiProperty()
  @IsDateString({}, { message: 'dataInicioTrab deve ser uma data válida.' })
  dataInicioTrab!: string;

  @ApiProperty()
  @IsBoolean({ message: 'restaurado deve ser verdadeiro ou falso.' })
  restaurado!: boolean;

  @ApiProperty()
  @IsNumber({}, { message: 'horasHomem deve ser um número.' })
  horasHomem!: number;

  @ApiProperty()
  @IsNumber({}, { message: 'atelieId deve ser um número.' })
  atelieId!: number;
}