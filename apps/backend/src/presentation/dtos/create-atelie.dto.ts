import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString, IsBoolean, IsNumber } from 'class-validator';

export class CreateAtelieDto {
  @ApiProperty()
  @IsString({ message: 'especialidadeEra deve ser um texto.' })
  @IsNotEmpty({ message: 'especialidadeEra é obrigatório.' })
  especialidadeEra!: string;

  @ApiProperty()
  @IsDateString({}, { message: 'dataFundacao deve ser uma data válida.' })
  dataFundacao!: string;

  @ApiProperty()
  @IsBoolean({ message: 'equipadoCompleto deve ser verdadeiro ou falso.' })
  equipadoCompleto!: boolean;

  @ApiProperty()
  @IsNumber({}, { message: 'areaOficinaM2 deve ser um número.' })
  areaOficinaM2!: number;
}