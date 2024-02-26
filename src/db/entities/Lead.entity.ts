import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import {Customer} from "./Customer.entity";
import {Category} from "./Category.entity";
import {Base} from "./Base.entity";

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ name: 'lead_code', type: 'varchar', nullable: false })
    'lead_code': string;

    @JoinColumn({ name: 'customer_id' })
    @ManyToOne(() => Customer)
    'customer_id': number;

    @JoinColumn({ name: 'category_id' })
    @OneToOne(() => Category)
    'category_id': number;

    @Column({ name: 'message', type: 'text', nullable: false })
    'message': string;

    @Column({ name: 'status', type: 'varchar', nullable: false, default: 'new' })
    'status': string

    @Column({ name: 'lead_value', type: 'numeric', nullable: true })
    'lead_value': number;

    @Column({ name: 'lead_source', type: 'string', nullable: true })
    'lead_source': string;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
