import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AtelieService } from '../../application/services/atelie.service';
import { CreateAtelieDto } from '../dtos/create-atelie.dto';
import { UpdateAtelieDto } from '../dtos/update-atelie.dto';

@ApiTags('Atelies')
@Controller('atelies')
export class AtelieController {
  constructor(private readonly atelieService: AtelieService) {}

  @Post()
  @ApiOperation({ summary: 'Criar ateliê' })
  create(@Body() dto: CreateAtelieDto) {
    return this.atelieService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar ateliês' })
  findAll() {
    return this.atelieService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar ateliê por id' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.atelieService.findById(id);
  }

  @Get(':id/com-projetos')
  @ApiOperation({ summary: 'Buscar ateliê com projetos' })
  findByIdWithProjects(@Param('id', ParseIntPipe) id: number) {
    return this.atelieService.findByIdWithProjects(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar ateliê' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAtelieDto) {
    return this.atelieService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar ateliê' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.atelieService.delete(id);
  }
}