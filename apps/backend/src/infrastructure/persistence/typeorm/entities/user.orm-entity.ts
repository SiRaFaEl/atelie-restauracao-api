import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  nome!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  senha!: string;

  @Column({ type: 'boolean', default: false })
  ativo: boolean;

  @Column({ type: 'varchar', default: 'user', length: 50 })
  role!: string; // 'user' ou 'admin'

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  criadoEm!: Date;
}
