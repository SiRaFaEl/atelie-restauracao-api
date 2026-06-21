import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserOrmEntity } from '../../infrastructure/persistence/typeorm/entities/user.orm-entity';
import { RegisterAuthDto } from '../../presentation/dtos/register-auth.dto';
import { LoginAuthDto } from '../../presentation/dtos/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserOrmEntity)
    private usersRepository: Repository<UserOrmEntity>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterAuthDto): Promise<{ message: string }> {
    const { email, senha, nome } = registerDto;

    // Verificar se o email já existe
    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(
        'E-mail já está cadastrado. Faça login ou use outro e-mail.',
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar novo usuário (inativo por padrão)
    const newUser = this.usersRepository.create({
      nome,
      email,
      senha: hashedPassword,
      ativo: false,
      role: 'user',
    });

    await this.usersRepository.save(newUser);

    return {
      message:
        'Cadastro realizado com sucesso! Aguarde ativação da conta pelo administrador.',
    };
  }

  async login(loginDto: LoginAuthDto): Promise<{ access_token: string; user: any }> {
    const { email, senha } = loginDto;

    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new BadRequestException('E-mail ou senha incorretos.');
    }

    if (!user.ativo) {
      throw new BadRequestException(
        'Sua conta não está ativa. Entre em contato com o administrador.',
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      nome: user.nome,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string): Promise<UserOrmEntity | null> {
    return this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  async findAllUsers(): Promise<UserOrmEntity[]> {
    return this.usersRepository.find({
      select: ['id', 'nome', 'email', 'ativo', 'role', 'criadoEm'],
    });
  }

  async toggleUserActive(userId: string): Promise<UserOrmEntity> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    user.ativo = !user.ativo;
    return this.usersRepository.save(user);
  }
}
