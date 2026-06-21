import { ProjetoMovelOrmEntity } from './projeto-movel.orm-entity';
export declare class AtelieRestauracaoOrmEntity {
    id: number;
    especialidadeEra: string;
    dataFundacao: string;
    equipadoCompleto: boolean;
    areaOficinaM2: number;
    projetos: ProjetoMovelOrmEntity[];
}
