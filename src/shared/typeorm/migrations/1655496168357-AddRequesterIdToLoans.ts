import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddRequesterIdToLoans1655496168357 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tb_loans',
      new TableColumn({
        name: 'requester_id',
        type: 'int',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'tb_loans',
      new TableForeignKey({
        name: 'LoansRequester',
        columnNames: ['requester_id'],
        referencedTableName: 'tb_accounts',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_loans', 'LoansRequester');
        await queryRunner.dropColumn('tb_loans', 'requester_id');
    }

}
