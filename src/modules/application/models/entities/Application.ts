import Version from "../../../version/models/entities/Version"
import IApplicationDTO from '../../dtos/IApplicationDTO';
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
  OneToMany,
} from 'typeorm';

@Entity()
export default class Application implements IApplicationDTO {
// export default class Application {
  @Column({ primary: true, unique: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  application_name: string;

  // @Column({ nullable: false })
  // application_file: string;

  // @Column({ nullable: false, unique: true })
  // package_name: string;

  @Column({ nullable: false })
  icon: string;

  // @Column({ nullable: false })
  // screenshots: string;

  @Column({ nullable: false, length: 500 })
  description: string;

  @Column({ nullable: false, default: 'ITEX' })
  organization: string;

  @Column({ nullable: false })
  latest_version: string;

  // @Column({ nullable: false, })
  // @OneToOne(() => Version, (version) => version.id)
  // @JoinColumn({ name: 'latest_version_id', referencedColumnName: 'id' })
  // latest_version_id: string;

  // @Column({ nullable: false })
  // @OneToOne(() => Organisation, (organisation) => organisation.id)
  // @JoinColumn({ name: 'account_info', referencedColumnName: 'id' })
  // owner: string;

  // @Column({ type: 'text', array: true, default: [] })
  // application_versions: string[];

  @Column({ nullable: false })
  device: string;

  // @Column({ nullable: false })
  // file_extension: string;

  // @Column({ nullable: false })
  // compatible_model_name: string;

  @Column({ nullable: false })
  program_file_name: string;

  @Column({ nullable: false })
  program_file_version: string;

  @Column({ nullable: false, default: 'ACTIVE', enum: ['INACTIVE', 'ACTIVE'] })
  status: string;

  @OneToMany(() => Version, (version) => version.application_name, {
    cascade: ['insert', 'remove', 'update'],
  })
  // @JoinColumn({ name: 'versions', referencedColumnName: 'version_no' })
  versions: string[];

  // @Column({ nullable: false })
  // @OneToOne(() => Organisation, (organisation) => organisation.id)
  // @JoinColumn({ name: 'account_info', referencedColumnName: 'id' })
  // owner: string;

  // @Column({ nullable: false })
  // md5_encoding: string;

  // @Column({ nullable: false, unique: true })
  // file_url: string;

  @Column({ nullable: false, default: false })
  shareToSubOrganization: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // @BeforeInsert()
  // async addVersion() {
  //   if (this.application_versions.length < 1) {
  //     this.application_versions = [this.version];
  //   }
  //   return this;
  // }
}
