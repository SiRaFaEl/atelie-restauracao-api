import * as path from 'node:path';
import * as fs from 'node:fs';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AtelieRestauracaoOrmEntity } from '../../infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity';
import { ProjetoMovelOrmEntity } from '../../infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity';
import { UserOrmEntity } from '../../infrastructure/persistence/typeorm/entities/user.orm-entity';

const isProduction = process.env.NODE_ENV === 'production';
const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'tema9.db');

// Garante que o diretório do SQLite exista antes do TypeORM tentar abrir o arquivo.
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: dbPath,
  entities: [AtelieRestauracaoOrmEntity, ProjetoMovelOrmEntity, UserOrmEntity],
  // Sincronização automática de schema apenas fora de produção.
  // Em produção, versione o schema com migrations: `typeorm migration:run`.
  synchronize: process.env.NODE_ENV !== 'production',
};