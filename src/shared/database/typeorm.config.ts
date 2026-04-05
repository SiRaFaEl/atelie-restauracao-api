import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AtelieRestauracaoOrmEntity } from '../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity';
import { ProjetoMovelOrmEntity } from '../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'data/tema9.db',
  entities: [AtelieRestauracaoOrmEntity, ProjetoMovelOrmEntity],
  synchronize: true,
};