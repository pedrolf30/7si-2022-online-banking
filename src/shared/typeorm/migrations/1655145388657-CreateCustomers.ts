import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1655145388657 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_customers',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'phone',
                    type: 'varchar',
                },
                {
                    name: 'cpf',
                    type: 'varchar',
                },
                {
                    name: 'rg',
                    type: 'varchar',
                },
                {
                    name: 'birthdate',
                    type: 'varchar',
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
        await queryRunner.dropTable('tb_customers');
    }

}
