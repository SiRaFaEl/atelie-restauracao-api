import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './shared/database/typeorm.config';
import { AtelieRestauracaoOrmEntity } from './infrastructure/persistence/typeorm/entities/atelie-restauracao.orm-entity';
import { ProjetoMovelOrmEntity } from './infrastructure/persistence/typeorm/entities/projeto-movel.orm-entity';
import { AtelieController } from './presentation/controllers/atelie.controller';
import { AtelieService } from './application/services/atelie.service';
import { AtelieTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/atelie-typeorm.repository';
import { ProjetoMovelController } from './presentation/controllers/projeto-movel.controller';
import { ProjetoMovelService } from './application/services/projeto-movel.service';
import { ProjetoMovelTypeOrmRepository } from './infrastructure/persistence/typeorm/repositories/projeto-movel-typeorm.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([
      AtelieRestauracaoOrmEntity,
      ProjetoMovelOrmEntity,
    ]),
  ],
  controllers: [AppController, AtelieController, ProjetoMovelController],
providers: [
  AppService,
  AtelieService,
  ProjetoMovelService,
  {
    provide: 'AtelieRepositoryPort',
    useClass: AtelieTypeOrmRepository,
  },
  {
    provide: 'ProjetoMovelRepositoryPort',
    useClass: ProjetoMovelTypeOrmRepository,
  },
],
})
export class AppModule {}