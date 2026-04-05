import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { AtelieRepositoryPort } from '../ports/atelie-repository.port';
import { CreateAtelieDto } from '../../presentation/dtos/create-atelie.dto';
import { UpdateAtelieDto } from '../../presentation/dtos/update-atelie.dto';

@Injectable()
export class AtelieService {
  constructor(
    @Inject('AtelieRepositoryPort')
    private readonly atelieRepository: AtelieRepositoryPort,
  ) {}

  async create(dto: CreateAtelieDto) {
    if (!dto.especialidadeEra || !dto.dataFundacao || dto.equipadoCompleto === undefined || dto.areaOficinaM2 === undefined) {
      throw new BadRequestException('Todos os campos do ateliê devem ser preenchidos.');
    }

    const dataFundacao = new Date(dto.dataFundacao);
    const hoje = new Date();

    if (dataFundacao > hoje) {
      throw new BadRequestException('Data de fundação não pode ser no futuro.');
    }

    if (dto.areaOficinaM2 < 50) {
      throw new BadRequestException('A área da oficina deve ser maior ou igual a 50 m².');
    }

    return this.atelieRepository.create(dto);
  }

  async findAll() {
    return this.atelieRepository.findAll();
  }

  async findById(id: number) {
    const atelie = await this.atelieRepository.findById(id);

    if (!atelie) {
      throw new NotFoundException('Ateliê não encontrado.');
    }

    return atelie;
  }

  async findByIdWithProjects(id: number) {
    const atelie = await this.atelieRepository.findByIdWithProjects(id);

    if (!atelie) {
      throw new NotFoundException('Ateliê não encontrado.');
    }

    return atelie;
  }

  async update(id: number, dto: UpdateAtelieDto) {
    if (dto.dataFundacao) {
      const dataFundacao = new Date(dto.dataFundacao);
      const hoje = new Date();

      if (dataFundacao > hoje) {
        throw new BadRequestException('Data de fundação não pode ser no futuro.');
      }
    }

    if (dto.areaOficinaM2 !== undefined && dto.areaOficinaM2 < 50) {
      throw new BadRequestException('A área da oficina deve ser maior ou igual a 50 m².');
    }

    return this.atelieRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.atelieRepository.delete(id);
  }
}