import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { STATUSES } from '../../config';
import { Base } from './Base.entity';
import { MediaFile } from './MediaFile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column({ type: 'varchar', nullable: true })
  'email': string;

  @Column({ type: 'varchar', nullable: false })
  'password': string;

  @Column({ type: 'varchar', nullable: true })
  'first_name': string;

  @Column({ type: 'varchar', nullable: true })
  'last_name': string;

  @Column({ type: 'varchar', nullable: false, default: STATUSES.PENDING })
  'status': STATUSES.PENDING | STATUSES.ACTIVE | STATUSES.DISABLED;

  @Column({ name: 'profile_picture_id', type: 'int', nullable: true })
  'profile_picture_id': number;

  @JoinColumn({ name: 'profile_picture_id' })
  @ManyToOne(() => MediaFile, { nullable: true })
  'profile_picture': MediaFile | null;

  @Column(() => Base, { prefix: false })
  'meta': Base;
}