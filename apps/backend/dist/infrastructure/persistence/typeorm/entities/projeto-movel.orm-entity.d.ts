import { AtelieRestauracaoOrmEntity } from './atelie-restauracao.orm-entity';
export declare class ProjetoMovelOrmEntity {
    id: number;
    tipoMovel: string;
    dataInicioTrab: string;
    restaurado: boolean;
    horasHomem: number;
    atelieId: number;
    atelie: AtelieRestauracaoOrmEntity;
}
