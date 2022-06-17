import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Customer from '../../../customers/typeorm/entities/Customer';

@Entity('tb_accounts')
class Account {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    account_number: string;

    @Column()
    account_type: string;

    @Column('decimal')
    @Exclude()
    balance: number;

    @Column()
    @Exclude()
    password: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}

export default Account;
