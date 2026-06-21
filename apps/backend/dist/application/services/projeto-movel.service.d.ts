import type { ProjetoMovelRepositoryPort } from '../ports/projeto-movel-repository.port';
import type { AtelieRepositoryPort } from '../ports/atelie-repository.port';
import { CreateProjetoMovelDto } from '../../presentation/dtos/create-projeto-movel.dto';
import { UpdateProjetoMovelDto } from '../../presentation/dtos/update-projeto-movel.dto';
export declare class ProjetoMovelService {
    private readonly projetoRepository;
    private readonly atelieRepository;
    private static readonly MIN_HORAS_HOMEM;
    private static readonly MAX_HORAS_HOMEM;
    private static readonly MIN_HORAS_RESTAURADO;
    constructor(projetoRepository: ProjetoMovelRepositoryPort, atelieRepository: AtelieRepositoryPort);
    create(dto: CreateProjetoMovelDto): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity>;
    findAll(): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity[]>;
    findById(id: number): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity>;
    update(id: number, dto: UpdateProjetoMovelDto): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity>;
    delete(id: number): Promise<void>;
    private validateCamposObrigatorios;
    private validateHorasHomem;
    private validateDataInicio;
}
