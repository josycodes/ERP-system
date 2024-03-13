import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base.entity';
import { Note } from './Note.entity';

@Entity('note_documents')
export class NoteDocuments {
  @PrimaryGeneratedColumn()
  'id': number;

  @Column({ type: 'int', nullable: true })
  'note_id': number;

  @Column({ name: 'name', type: 'varchar', nullable: false })
  'name': string;

  @Column({ name: 'description', type: 'varchar', nullable: true })
  'description': string;

  @Column({ name: 'object_key', type: 'varchar', nullable: false })
  'object_key': string;

  @Column({ name: 'url', type: 'varchar', nullable: true })
  'url': string;

  @JoinColumn({ name: 'note_id' })
  @ManyToOne(() => Note, (note) => note)
  'note': Note;

  @Column(() => Base, { prefix: false })
  'meta': Base;
}
