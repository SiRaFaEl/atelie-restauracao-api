import { ProjetoMovelOrmEntity } from '../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity';

export interface ProjetoMovelRepositoryPort {
  create(data: Partial<ProjetoMovelOrmEntity>): Promise<ProjetoMovelOrmEntity>;
  findAll(): Promise<ProjetoMovelOrmEntity[]>;
  findById(id: number): Promise<ProjetoMovelOrmEntity | null>;
  findDuplicateOpenProject(atelieId: number, tipoMovel: string): Promise<ProjetoMovelOrmEntity | null>;
  update(id: number, data: Partial<ProjetoMovelOrmEntity>): Promise<ProjetoMovelOrmEntity>;
  delete(id: number): Promise<void>;
}