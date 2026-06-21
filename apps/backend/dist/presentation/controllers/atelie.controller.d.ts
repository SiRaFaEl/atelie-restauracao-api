import { AtelieService } from '../../application/services/atelie.service';
import { CreateAtelieDto } from '../dtos/create-atelie.dto';
import { UpdateAtelieDto } from '../dtos/update-atelie.dto';
export declare class AtelieController {
    private readonly atelieService;
    constructor(atelieService: AtelieService);
    create(dto: CreateAtelieDto): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    findAll(): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity[]>;
    findById(id: number): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    findByIdWithProjects(id: number): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    update(id: number, dto: UpdateAtelieDto): Promise<import("../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity").AtelieRestauracaoOrmEntity>;
    delete(id: number): Promise<void>;
}
