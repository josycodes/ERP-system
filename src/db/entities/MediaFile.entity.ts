import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './Base.entity';
import { User } from './User.entity';

@Entity('media_files')
export class MediaFile {
  @PrimaryGeneratedColumn()
  'id': number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  'user_id': number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  'name': string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  'description': string;

  @Column({ name: 'object_key', type: 'varchar', nullable: false })
  'object_key': string;

  @Column({ name: 'url', type: 'varchar', nullable: true })
  'url': string;

  @Column(() => Base, { prefix: false })
  'meta': Base;
}
