
import {
    Entity, PrimaryGeneratedColumn,
    Column, JoinColumn, ManyToOne, OneToOne
} from 'typeorm';
import { Customer } from "./Customer.entity";
import { LeadCategory } from "./LeadCategory";
import { LEADS_STATUSES } from "../../config";
import { Base } from "./Base.entity";

import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import {Customer} from "./Customer.entity";
import {Category} from "./Category.entity";
import {Base} from "./Base.entity";

@Entity('leads')
export class Lead {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ name: 'customer_id', type: 'int', nullable: true })
    'customer_id': number;

    @Column({ name: 'category_id', type: 'int', nullable: true })
    'category_id': number;

    @Column({ name: 'lead_code', type: 'varchar', nullable: false })
    'lead_code': string;

    @Column({ name: 'message', type: 'text', nullable: false })
    'message': string;

    @Column({ name: 'status', type: 'varchar', nullable: false, default: 'new' })
    'status': string

    @Column({ name: 'lead_value', type: 'numeric', nullable: true })
    'lead_value': number;

    @Column({ name: 'lead_source', type: 'varchar', nullable: true })
    'lead_source': string;

    @JoinColumn({ name: 'customer_id' })
    @ManyToOne(() => Customer)
    'customer': number;

    @JoinColumn({ name: 'category_id' })
    @OneToOne(() => LeadCategory)
    'category': number;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
