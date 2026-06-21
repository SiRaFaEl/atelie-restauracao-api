import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed/seed.service';
import { UserOrmEntity } from '../infrastructure/persistence/typeorm/entities/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SharedModule {}
