import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base.entity';
import {Template} from "./Template.entity";
import {User} from "./User.entity";

@Entity('template_share')
export class TemplateShare {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'int', nullable: true })
    'template_id': number;

    @Column({ type: 'varchar', nullable: true })
    'share_type': string;

    @Column({ type: 'int', nullable: true })
    'user_id': number;

    @JoinColumn({ name: 'template_id' })
    @ManyToOne(() => Template, { nullable: true })
    'template': Template | null;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User, { nullable: true })
    'user': User | null;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
