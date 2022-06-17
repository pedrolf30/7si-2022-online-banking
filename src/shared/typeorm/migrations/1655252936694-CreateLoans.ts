import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLoans1655252936694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(new Table({
            name: 'tb_loans',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'loan_reference',
                    type: 'varchar',
                },
                {
                    name: 'status',
                    type: 'varchar',
                    enum: ['awaiting_payment', 'denied', 'under_review', 'paid_out'],
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'installments',
                    type: 'int',
                },
                {
                    name: 'finality',
                    type: 'varchar',
                    enum: [
                        'travel',
                        'debts',
                        'education',
                        'investments',
                        'medical_expenses',
                    ],
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                 {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_loans');
    }

}
