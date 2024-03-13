import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { NOTE_STATUS } from '../../config';
import { Base } from './Base.entity';
import { NoteDocuments } from './NoteDocument.entity';
import { User } from './User.entity';
import { NoteTag } from './NoteTag.entity';
import { Lead } from './Lead.entity';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column({ type: 'int', nullable: true })
  'lead_id': number;

  @Column({ type: 'varchar', nullable: true })
  'title': string;

  @Column({ type: 'text', nullable: false })
  'content': string;

  @Column({ type: 'varchar', nullable: false, default: NOTE_STATUS.DRAFT })
  'status': NOTE_STATUS;

  @Column({ type: 'int', nullable: true })
  'owner_id': number;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(() => User, (user) => user)
  'owner': User;

  // @OneToMany(() => NoteTag, (noteTag) => noteTag.note)
  // 'tags': NoteTag[];

  // // @JoinColumn({ name: 'lead_id' })
  // // @OneToMany(() => Lead, (lead) => lead)
  // // 'lead': Lead;

  // @OneToMany(() => NoteDocuments, (document) => document)
  // 'documents': NoteDocuments[];

  @Column(() => Base, { prefix: false })
  'meta': Base;
}
