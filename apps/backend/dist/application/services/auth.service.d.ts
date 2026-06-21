import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../../infrastructure/persistence/typeorm/entities/user.orm-entity';
import { RegisterAuthDto } from '../../presentation/dtos/register-auth.dto';
import { LoginAuthDto } from '../../presentation/dtos/login-auth.dto';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<UserOrmEntity>, jwtService: JwtService);
    register(registerDto: RegisterAuthDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginAuthDto): Promise<{
        access_token: string;
        user: any;
    }>;
    validateUser(userId: string): Promise<UserOrmEntity | null>;
    findAllUsers(): Promise<UserOrmEntity[]>;
    toggleUserActive(userId: string): Promise<UserOrmEntity>;
}
