import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAtelieDto {
  @ApiProperty({ example: 'Art Déco' })
  @IsString()
  @IsNotEmpty()
  especialidadeEra!: string;

  @ApiProperty({ example: '2020-05-10' })
  @IsDateString()
  dataFundacao!: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  equipadoCompleto!: boolean;

  @ApiProperty({ example: 80 })
  @IsNumber()
  areaOficinaM2!: number;
}