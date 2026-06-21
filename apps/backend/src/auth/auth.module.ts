import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../application/services/auth.service';
import { AuthController } from '../presentation/controllers/auth.controller';
import { UsersController } from '../presentation/controllers/users.controller';
import { JwtStrategy } from '../infrastructure/auth/jwt.strategy';
import { UserOrmEntity } from '../infrastructure/persistence/typeorm/entities/user.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: (process.env.JWT_EXPIRATION || '60m') as any },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController, UsersController],
  exports: [AuthService],
})
export class AuthModule {}
