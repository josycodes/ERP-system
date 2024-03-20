import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Base} from "./Base.entity";

@Entity('leads_categories')
export class Category {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'varchar', nullable: false })
    'name': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
