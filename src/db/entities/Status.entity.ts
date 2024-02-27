import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Base} from "./Base.entity";

@Entity('statuses')
export class Status {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'varchar', nullable: false })
    'name': string;

    @Column({ type: 'varchar', nullable: false })
    'slug': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
