import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './Base.entity';
import { User } from './User.entity';
import {Lead} from "./Lead.entity";

@Entity('media_files')
export class MediaFile {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  'user_id': number;

  @Column({ name: 'lead_id', type: 'int', nullable: true })
  'lead_id': number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  'name': string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  'description': string;

  @Column({ name: 'object_key', type: 'varchar', nullable: true })
  'object_key': string;

  @Column({ name: 'url', type: 'varchar', nullable: true })
  'url': string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  'user': User;

  @JoinColumn({ name: 'lead_id' })
  @ManyToOne(() => Lead)
  'lead': Lead;

  @Column(() => Base, { prefix: false })
  'meta': Base;
}
