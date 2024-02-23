import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Base} from "./Base.entity";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column()
    'name': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
