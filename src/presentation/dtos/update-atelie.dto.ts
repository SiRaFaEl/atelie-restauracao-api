import { PartialType } from '@nestjs/swagger';
import { CreateAtelieDto } from './create-atelie.dto';

export class UpdateAtelieDto extends PartialType(CreateAtelieDto) {}