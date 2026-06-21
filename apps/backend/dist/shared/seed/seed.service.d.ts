import { Repository } from 'typeorm';
import { UserOrmEntity } from '../../infrastructure/persistence/typeorm/entities/user.orm-entity';
export declare class SeedService {
    private usersRepository;
    constructor(usersRepository: Repository<UserOrmEntity>);
    seedAdminUser(): Promise<void>;
}
