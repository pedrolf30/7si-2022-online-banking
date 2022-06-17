import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Account from '../../../accounts/typeorm/entities/Account';

@Entity('tb_loans')
class Loan {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    loan_reference: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'requester_id' })
    requester_id: Account;

    @Column()
    status: string;

    @Column()
    amount: number;

    @Column()
    installments: number;

    @Column()
    finality: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Loan;
