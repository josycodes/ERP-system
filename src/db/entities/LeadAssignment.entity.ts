import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, OneToOne} from 'typeorm';
import {Lead} from "./Lead.entity";
import {User} from "./User.entity";
import {Base} from "./Base.entity";

@Entity('lead_assignments')
export class LeadAssignment {
    @PrimaryGeneratedColumn()
    'id': number;

    @JoinColumn({ name: 'lead_id' })
    @OneToOne(() => Lead)
    'lead_id': number;

    @JoinColumn({ name: 'user_id' })
    @ManyToOne(() => User)
    'user_id': number;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
