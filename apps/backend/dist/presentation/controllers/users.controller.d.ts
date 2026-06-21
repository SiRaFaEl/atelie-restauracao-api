import { AuthService } from '../../application/services/auth.service';
export declare class UsersController {
    private readonly authService;
    constructor(authService: AuthService);
    listUsers(): Promise<import("../../infrastructure/persistence/typeorm/entities/user.orm-entity").UserOrmEntity[]>;
    toggleUserActive(userId: string): Promise<import("../../infrastructure/persistence/typeorm/entities/user.orm-entity").UserOrmEntity>;
}
