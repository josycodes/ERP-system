import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base.entity';
import { Note } from './Note.entity';
import { Customer } from './Customer.entity';

@Entity('note_tags')
export class NoteTag {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column({ type: 'int', nullable: true })
  'note_id': number;

  @Column({ type: 'int', nullable: true })
  'user_id': number;

  @JoinColumn({ name: 'note_id' })
  @ManyToOne(() => Note, { nullable: true })
  'note': Note | null;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => Customer, { nullable: true })
  'user': Customer | null;

  @Column(() => Base, { prefix: false })
  'meta': Base;
}
