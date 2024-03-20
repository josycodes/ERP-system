import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Base } from './Base.entity';
import {Template} from "./Template.entity";

@Entity('template_tags')
export class TemplateTag {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'int', nullable: true })
    'template_id': number;

    @Column({ type: 'int', nullable: true })
    'tag_id': number;

    @Column({ type: 'string', nullable: true })
    'entity': string;

    @Column({ type: 'int', nullable: true })
    'entity_id': number;

    @JoinColumn({ name: 'template_id' })
    @ManyToOne(() => Template, { nullable: true })
    'template': Template | null;

    @Column(() => Base, { prefix: false })
    'meta': Base;
    entity_data: any;
}
