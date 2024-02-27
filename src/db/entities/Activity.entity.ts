import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Base } from "./Base.entity";
import { ACTIVITY_TYPES } from '../../config';

@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'varchar', nullable: true })
    'actor': string;

    @Column({ type: 'varchar', nullable: true })
    'action': string;

    @Column({ type: 'varchar', nullable: true })
    'target': string;

    @Column({ type: 'varchar', nullable: true })
    'details': string

    @Column({ type: 'varchar', nullable: false })
    'category': ACTIVITY_TYPES

    @Column('jsonb', { name: 'action_changes', nullable: true })
    'action_changes'?: {} | null;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
