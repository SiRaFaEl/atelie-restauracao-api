import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProjetoMovelService } from '../../application/services/projeto-movel.service';
import { CreateProjetoMovelDto } from '../dtos/create-projeto-movel.dto';
import { UpdateProjetoMovelDto } from '../dtos/update-projeto-movel.dto';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard';

@ApiTags('Projetos')
@Controller('projetos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjetoMovelController {
  constructor(private readonly projetoService: ProjetoMovelService) {}

  @Post()
  @ApiOperation({ summary: 'Criar projeto de móvel' })
  create(@Body() dto: CreateProjetoMovelDto) {
    return this.projetoService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar projetos' })
  findAll() {
    return this.projetoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar projeto por id' })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.projetoService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar projeto' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjetoMovelDto) {
    return this.projetoService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar projeto' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.projetoService.delete(id);
  }
}