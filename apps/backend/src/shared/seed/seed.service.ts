import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserOrmEntity } from '../../infrastructure/persistence/typeorm/entities/user.orm-entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private usersRepository: Repository<UserOrmEntity>,
  ) {}

  async seedAdminUser() {
    const adminEmail = 'admin@atelie.com';
    const existingAdmin = await this.usersRepository.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = this.usersRepository.create({
        nome: 'Administrador',
        email: adminEmail,
        senha: hashedPassword,
        ativo: true,
        role: 'admin',
      });

      await this.usersRepository.save(adminUser);
      console.log('✓ Usuário admin criado com sucesso');
      console.log('  Email: admin@atelie.com');
      console.log('  Senha: admin123');
    }
  }
}
