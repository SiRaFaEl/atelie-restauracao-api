import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjetoMovelDto {
  @ApiProperty({ example: 'Cômoda Luís XV' })
  @IsString()
  @IsNotEmpty()
  tipoMovel!: string;

  @ApiProperty({ example: '2024-08-15' })
  @IsDateString()
  dataInicioTrab!: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  restaurado!: boolean;

  @ApiProperty({ example: 120 })
  @IsNumber()
  horasHomem!: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  atelieId!: number;
}