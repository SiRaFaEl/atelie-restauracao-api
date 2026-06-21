import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjetoMovelOrmEntity } from './projeto-movel.orm-entity';

@Entity('atelies_restauracao')
export class AtelieRestauracaoOrmEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  especialidadeEra!: string;

  @Column({ type: 'date' })
  dataFundacao!: string;

  @Column()
  equipadoCompleto!: boolean;

  @Column('float')
  areaOficinaM2!: number;

  @OneToMany(() => ProjetoMovelOrmEntity, (projeto) => projeto.atelie)
  projetos!: ProjetoMovelOrmEntity[];
}