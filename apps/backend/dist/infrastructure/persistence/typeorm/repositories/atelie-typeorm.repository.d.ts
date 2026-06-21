import { Repository } from 'typeorm';
import { AtelieRepositoryPort } from '../../../../application/ports/atelie-repository.port';
import { AtelieRestauracaoOrmEntity } from '../entities/atelie-restauracao.orm-entity';
export declare class AtelieTypeOrmRepository implements AtelieRepositoryPort {
    private readonly repository;
    constructor(repository: Repository<AtelieRestauracaoOrmEntity>);
    create(data: Partial<AtelieRestauracaoOrmEntity>): Promise<AtelieRestauracaoOrmEntity>;
    findAll(): Promise<AtelieRestauracaoOrmEntity[]>;
    findById(id: number): Promise<AtelieRestauracaoOrmEntity | null>;
    findByIdWithProjects(id: number): Promise<AtelieRestauracaoOrmEntity | null>;
    update(id: number, data: Partial<AtelieRestauracaoOrmEntity>): Promise<AtelieRestauracaoOrmEntity>;
    delete(id: number): Promise<void>;
}
