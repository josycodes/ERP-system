import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base.entity';
import { Note } from './Note.entity';
import {User} from "./User.entity";

@Entity('note_tags')
export class NoteTag {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column({ type: 'int', nullable: true })
  'note_id': number;

  @Column({ type: 'int', nullable: true })
  'user_id': number;

  @Column({ type: 'int', nullable: true })
  'tag_id': number;

  @Column({ type: 'varchar', nullable: true })
  'entity': string;

  @Column({ type: 'int', nullable: true })
  'entity_id': number;

  @JoinColumn({ name: 'note_id' })
  @ManyToOne(() => Note, { nullable: true })
  'note': Note | null;

  @JoinColumn({ name: 'user__id' })
  @ManyToOne(() => User, { nullable: true })
  'user': User | null;
  //
  // @JoinColumn({ name: 'entity_id' })
  // @ManyToOne(() => Customer, { nullable: true })
  // 'customer': Customer | null;

  @Column(() => Base, { prefix: false })
  'meta': Base;
  entity_data: any;
}
