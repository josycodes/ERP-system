import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Base} from "./Base.entity";

@Entity('statuses')
export class Status {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'name': string;

    @Column()
    'slug': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
