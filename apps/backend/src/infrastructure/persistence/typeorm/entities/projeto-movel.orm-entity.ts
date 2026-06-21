import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AtelieRestauracaoOrmEntity } from './atelie-restauracao.orm-entity';
@Entity('projetos_movel')
export class ProjetoMovelOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipoMovel: string;

  @Column({ type: 'date' })
  dataInicioTrab: string;

  @Column()
  restaurado: boolean;

  @Column('int')
  horasHomem: number;

  @Column()
  atelieId: number;

  @ManyToOne(() => AtelieRestauracaoOrmEntity, (atelie) => atelie.projetos)
  @JoinColumn({ name: 'atelieId' })
  atelie: AtelieRestauracaoOrmEntity;
}