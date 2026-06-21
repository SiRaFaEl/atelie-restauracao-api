import { ProjetoMovelService } from '../../application/services/projeto-movel.service';
import { CreateProjetoMovelDto } from '../dtos/create-projeto-movel.dto';
import { UpdateProjetoMovelDto } from '../dtos/update-projeto-movel.dto';
export declare class ProjetoMovelController {
    private readonly projetoService;
    constructor(projetoService: ProjetoMovelService);
    create(dto: CreateProjetoMovelDto): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity>;
    findAll(): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity[]>;
    findById(id: number): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity>;
    update(id: number, dto: UpdateProjetoMovelDto): Promise<import("../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity").ProjetoMovelOrmEntity>;
    delete(id: number): Promise<void>;
}
