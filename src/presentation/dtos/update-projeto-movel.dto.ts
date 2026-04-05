import { PartialType } from '@nestjs/swagger';
import { CreateProjetoMovelDto } from './create-projeto-movel.dto';

export class UpdateProjetoMovelDto extends PartialType(CreateProjetoMovelDto) {}