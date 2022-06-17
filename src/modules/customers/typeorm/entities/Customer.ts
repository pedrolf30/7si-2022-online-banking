import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity('tb_customers')
class Customer {
    @PrimaryGeneratedColumn('increment')
    @Exclude()
    id: number;

    @Column()

    name: string;

    @Column()
    @Exclude()
    email: string;

    @Column()
    @Exclude()
    phone: string;

    @Column()
    @Exclude()
    cpf: string;

    @Column()
    @Exclude()
    rg: string;

    @Column()
    @Exclude()
    birthdate: string;

    @CreateDateColumn()
    @Exclude()
    created_at: Date;

    @UpdateDateColumn()
    @Exclude()
    updated_at: Date;
}

export default Customer;
