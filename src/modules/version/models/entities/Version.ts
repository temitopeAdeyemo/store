import Application from '../../../application/models/entities/Application';
import IVersionDTO from '../../dtos/IVersionDTO';
import {
  Entity,
  Column,
  Generated,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export default class Version implements IVersionDTO {
// export default class Version {
  @Column({ primary: true, unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  version_name: string;

  @Column({ nullable: false })
  md5_encoding: string;

  @Column({ nullable: false, unique: true })
  package_name: string;

  @Column({ nullable: false, default: true })
  latest: boolean;

  @Column({ nullable: true })
  screenshots: string;

  @Column({ nullable: false, length: 500 })
  description: string;

  @Column({ nullable: false, unique: true })
  build_number: string;

  @Column({ nullable: false, unique: true })
  version_no: string;

  @Column({ type: 'text', array: true, default: [] })
  compatible_model_names: string[];

  @Column({ nullable: true, default: '0' })
  download_no: string;

  @Column({ nullable: false })
  file_extension: string;

  // @Column({ nullable: false })
  // compatible_model_name: string;

  // @Column({ nullable: false })
  // program_file_name: string;

  // @Column({ nullable: false })
  // program_file_version: string;

  // @Column({ nullable: false, default: 'INACTIVE', enum: ['INACTIVE', 'ACTIVE'] })
  // status: string;

  @Column({ nullable: false })
  @ManyToOne(() => Application, (application) => application.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'application', referencedColumnName: 'application_name' })
  application_name: string;

  // @Column({ nullable: false })
  // md5_encoding: string;

  @Column({ nullable: false, unique: true })
  file_url: string;

  // @Column({ nullable: false, default: false })
  // shareToSubOrganization: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
