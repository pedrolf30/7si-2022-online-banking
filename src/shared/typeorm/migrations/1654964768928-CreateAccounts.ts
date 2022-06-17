import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAccounts1654964768928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_accounts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'account_number',
                    type: 'varchar',
                },
                {
                    name: 'account_type',
                    type: 'varchar',
                    enum: ['checking_account', 'saving_account'],
                },
                {
                    name: 'balance',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    default: 0.0,
                },
                {
                    name: 'password',
                    type: 'varchar'
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
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_accounts');
    }

}
