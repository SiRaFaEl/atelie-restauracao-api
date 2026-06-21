import type { AtelieRepositoryPort } from '../ports/atelie-repository.port';
import { CreateAtelieDto } from '../../presentation/dtos/create-atelie.dto';
import { UpdateAtelieDto } from '../../presentation/dtos/update-atelie.dto';
export declare class AtelieService {
    private readonly atelieRepository;
    private static readonly MIN_AREA_OFICINA_M2;
    constructor(atelieRepository: AtelieRepositoryPort);
    create(dto: CreateAtelieDto): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    findAll(): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity[]>;
    findById(id: number): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    findByIdWithProjects(id: number): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    update(id: number, dto: UpdateAtelieDto): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    delete(id: number): Promise<void>;
    private validateDataFundacao;
    private validateAreaOficina;
}
