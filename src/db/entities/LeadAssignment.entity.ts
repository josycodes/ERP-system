import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import {Lead} from "./Lead.entity";
import {User} from "./User.entity";
import {Base} from "./Base.entity";

@Entity('lead_assignments')
export class LeadAssignment {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ name: 'lead_id', type: 'int', nullable: true })
    'lead_id': number;

    @Column({ name: 'user_id', type: 'int', nullable: true })
    'user_id': number;

    @JoinColumn({ name: 'lead_id' })
    @OneToOne(() => Lead)
    'lead': Lead;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    'user': User;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
