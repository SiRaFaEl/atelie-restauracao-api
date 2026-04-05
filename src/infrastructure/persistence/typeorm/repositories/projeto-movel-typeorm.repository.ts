import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { ProjetoMovelRepositoryPort } from '../../../../application/ports/projeto-movel-repository.port';
import { ProjetoMovelOrmEntity } from '../entities/projeto-movel.orm-entity';

@Injectable()
export class ProjetoMovelTypeOrmRepository implements ProjetoMovelRepositoryPort {
  constructor(
    @InjectRepository(ProjetoMovelOrmEntity)
    private readonly repository: Repository<ProjetoMovelOrmEntity>,
  ) {}

  async create(data: Partial<ProjetoMovelOrmEntity>): Promise<ProjetoMovelOrmEntity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<ProjetoMovelOrmEntity[]> {
    return this.repository.find({ relations: ['atelie'] });
  }

  async findById(id: number): Promise<ProjetoMovelOrmEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['atelie'],
    });
  }

  async findDuplicateOpenProject(atelieId: number, tipoMovel: string): Promise<ProjetoMovelOrmEntity | null> {
    return this.repository.findOne({
      where: {
        atelieId,
        tipoMovel,
        restaurado: false,
      },
    });
  }

  async update(id: number, data: Partial<ProjetoMovelOrmEntity>): Promise<ProjetoMovelOrmEntity> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new NotFoundException('Projeto de móvel não encontrado.');
    }

    Object.assign(existing, data);
    return this.repository.save(existing);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new NotFoundException('Projeto de móvel não encontrado.');
    }

    await this.repository.remove(existing);
  }
}