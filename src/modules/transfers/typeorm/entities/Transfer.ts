import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Account from '../../../accounts/typeorm/entities/Account';

@Entity('tb_transfers')
class Transfer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    transfer_reference: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'sender_id' })
    sender_id: Account;

    @ManyToOne(() => Account)
    @JoinColumn({ name: 'receiver_id' })
    receiver_id: Account;

    @Column('decimal')
    amount: number;

    @CreateDateColumn()
    transferred_at: Date;
}

export default Transfer;
