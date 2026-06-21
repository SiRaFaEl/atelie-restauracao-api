import { AuthService } from '../../application/services/auth.service';
import { RegisterAuthDto } from '../../presentation/dtos/register-auth.dto';
import { LoginAuthDto } from '../../presentation/dtos/login-auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterAuthDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginAuthDto): Promise<{
        access_token: string;
        user: any;
    }>;
    listUsers(): Promise<import("../../infrastructure/persistence/typeorm/entities/user.orm-entity").UserOrmEntity[]>;
    toggleUserActive(userId: string): Promise<import("../../infrastructure/persistence/typeorm/entities/user.orm-entity").UserOrmEntity>;
}
