import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateProjetoMovelDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'tipoMovel deve ser um texto.' })
  tipoMovel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString({}, { message: 'dataInicioTrab deve ser uma data válida.' })
  dataInicioTrab?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'restaurado deve ser verdadeiro ou falso.' })
  restaurado?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'horasHomem deve ser um número.' })
  horasHomem?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'atelieId deve ser um número.' })
  atelieId?: number;
}