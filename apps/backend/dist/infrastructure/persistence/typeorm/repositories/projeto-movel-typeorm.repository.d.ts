import { Repository } from 'typeorm';
import type { ProjetoMovelRepositoryPort } from '../../../../application/ports/projeto-movel-repository.port';
import { ProjetoMovelOrmEntity } from '../entities/projeto-movel.orm-entity';
export declare class ProjetoMovelTypeOrmRepository implements ProjetoMovelRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<ProjetoMovelOrmEntity>);
    create(data: Partial<ProjetoMovelOrmEntity>): Promise<ProjetoMovelOrmEntity>;
    findAll(): Promise<ProjetoMovelOrmEntity[]>;
    findById(id: number): Promise<ProjetoMovelOrmEntity | null>;
    findDuplicateOpenProject(atelieId: number, tipoMovel: string): Promise<ProjetoMovelOrmEntity | null>;
    update(id: number, data: Partial<ProjetoMovelOrmEntity>): Promise<ProjetoMovelOrmEntity>;
    delete(id: number): Promise<void>;
}
