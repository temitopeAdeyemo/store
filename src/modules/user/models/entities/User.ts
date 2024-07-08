import IEntityDTO from '../../dtos/IEntityDTO';
import {
  Entity,
  Column,
  Generated,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export default class User implements IEntityDTO {
  @Column({ primary: true, unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  entity_name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true, default: 'USER' })
  role: string;

  @Column({ nullable: true })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
