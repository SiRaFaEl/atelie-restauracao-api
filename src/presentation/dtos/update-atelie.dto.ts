import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateAtelieDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'especialidadeEra deve ser um texto.' })
  especialidadeEra?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString({}, { message: 'dataFundacao deve ser uma data válida.' })
  dataFundacao?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean({ message: 'equipadoCompleto deve ser verdadeiro ou falso.' })
  equipadoCompleto?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber({}, { message: 'areaOficinaM2 deve ser um número.' })
  areaOficinaM2?: number;
}