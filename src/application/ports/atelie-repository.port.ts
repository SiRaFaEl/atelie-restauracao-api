import { AtelieRestauracaoOrmEntity } from '../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity';

export interface AtelieRepositoryPort {
  create(data: Partial<AtelieRestauracaoOrmEntity>): Promise<AtelieRestauracaoOrmEntity>;
  findAll(): Promise<AtelieRestauracaoOrmEntity[]>;
  findById(id: number): Promise<AtelieRestauracaoOrmEntity | null>;
  findByIdWithProjects(id: number): Promise<AtelieRestauracaoOrmEntity | null>;
  update(id: number, data: Partial<AtelieRestauracaoOrmEntity>): Promise<AtelieRestauracaoOrmEntity>;
  delete(id: number): Promise<void>;
}