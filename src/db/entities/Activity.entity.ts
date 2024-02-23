import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Base} from "./Base.entity";

@Entity('activities')
export class Activity {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'firstName': string;

    @Column()
    'lastName': string;

    @Column()
    'email': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
