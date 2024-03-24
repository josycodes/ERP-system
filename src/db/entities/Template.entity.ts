import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Base } from './Base.entity';
import { User } from './User.entity';
import { Category } from './Category.entity';

@Entity('templates')
export class Template {
    @PrimaryGeneratedColumn()
    'id': number;

    @Column({ type: 'varchar', nullable: true })
    'title': string;

    @Column({ type: 'varchar', nullable: true })
    'subject': string;

    @Column({ type: 'text', nullable: false })
    'content': string;

    @Column({ type: 'int', nullable: true })
    'category_id': number;

    @Column({ type: 'int', nullable: true })
    'owner_id': number;

    @JoinColumn({ name: 'owner_id' })
    @ManyToOne(() => User, (user) => user)
    'owner': User;

    @JoinColumn({ name: 'category_id' })
    @ManyToOne(() => Category, (category) => category)
    'category': Category;

    @Column(() => Base, { prefix: false })
    'meta': Base;
}
