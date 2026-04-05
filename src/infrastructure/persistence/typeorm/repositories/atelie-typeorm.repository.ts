import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AtelieRepositoryPort } from '../../../../application/ports/atelie-repository.port';
import { AtelieRestauracaoOrmEntity } from '../entities/atelie-restauracao.orm-entity';

@Injectable()
export class AtelieTypeOrmRepository implements AtelieRepositoryPort {
  constructor(
    @InjectRepository(AtelieRestauracaoOrmEntity)
    private readonly repository: Repository<AtelieRestauracaoOrmEntity>,
  ) {}

  async create(data: Partial<AtelieRestauracaoOrmEntity>): Promise<AtelieRestauracaoOrmEntity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<AtelieRestauracaoOrmEntity[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<AtelieRestauracaoOrmEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByIdWithProjects(id: number): Promise<AtelieRestauracaoOrmEntity | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['projetos'],
    });
  }

  async update(id: number, data: Partial<AtelieRestauracaoOrmEntity>): Promise<AtelieRestauracaoOrmEntity> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new NotFoundException('Ateliê não encontrado.');
    }

    Object.assign(existing, data);
    return this.repository.save(existing);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.findById(id);

    if (!existing) {
      throw new NotFoundException('Ateliê não encontrado.');
    }

    await this.repository.remove(existing);
  }
}