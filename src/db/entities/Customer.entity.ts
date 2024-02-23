import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {Base} from "./Base.entity";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ name: 'name', type: 'varchar', nullable: false })
    'name': string;

    @Column({ name: 'email', type: 'varchar', nullable: false })
    'email': string;

    @Column({ name: 'phone', type: 'varchar', nullable: false })
    'phone': string;

    @Column({ name: 'address', type: 'varchar', nullable: true })
    'address': string;

    @Column({ name: 'preferred_contact_method', type: 'varchar', nullable: true, default: 'email' })
    'preferred_contact_method': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
